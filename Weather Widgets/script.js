document.addEventListener("DOMContentLoaded", () => {
    const app = document.getElementById("app");

    // Create Weather Widget
    const widgetContainer = document.createElement("details");
    widgetContainer.id = "widget1";
    widgetContainer.className = "weather-widget";

    const summary = document.createElement("summary");
    summary.className = "weather-summary";
    summary.innerHTML = `<span>Batumi</span>
                         <span data-stat="temperature">28°C</span>`;
    widgetContainer.appendChild(summary);

    const content = document.createElement("div");
    content.className = "weather-content";
    content.innerHTML = `
        <p><strong>Kind:</strong> <span data-stat="kind">Sunny</span></p>
        <p><strong>Time:</strong> <time data-stat="time"></time></p>
        <p><strong>Wind:</strong> <span data-stat="wind">5 mph</span></p>
        <p><strong>Visibility:</strong> <span data-stat="visibility">22 mi</span></p>
        <p><strong>Air Quality:</strong> <span data-stat="air_quality">54</span></p>
        <p><strong>Humidity:</strong> <span data-stat="humidity">59%</span></p>
    `;
    widgetContainer.appendChild(content);

    app.appendChild(widgetContainer);

    const widget = new WeatherWidget("#widget1", {
        city: "Batumi",
        kind: "sunny-hot",
        time: new Date(2024, 5, 21, 11, 15),
        temperature: 28,
        temperature_scale: "C",
        wind: 5,
        wind_unit: "mph",
        visibility: 22,
        visibility_unit: "mi",
        air_quality: 54,
        humidity: 59
    });
});

class WeatherWidget {
    el;
    summary;
    content;
    isCollapsing = false;
    isExpanding = false;
    animation;
    animParams = {
        duration: 400,
        easing: "cubic-bezier(0.33,1,0.67,1)"
    };
    animActionsExpand = {
        onfinish: this.onAnimationFinish.bind(this, true),
        oncancel: () => { this.isExpanding = false; }
    };
    animActionsCollapse = {
        onfinish: this.onAnimationFinish.bind(this, false),
        oncancel: () => { this.isCollapsing = false; }
    };
    detailsOpen = true;
    weather;
    lang = "en-US";

    constructor(el, data) {
        this.el = document.querySelector(el);
        this.weather = data;
        this.displayWeather();
        this.summary = this.el?.querySelector("summary");
        this.summary?.addEventListener("click", this.toggle.bind(this));
        this.content = this.summary?.nextElementSibling;
    }

    displayWeather() {
        if (!this.weather) return;

        const weatherProps = Object.keys(this.weather).filter(key => key.indexOf("_unit") < 0);

        weatherProps.forEach(prop => {
            const propEl = this.el?.querySelector(`[data-stat=${prop}]`);

            if (!propEl) return;

            let value = this.weather?.[prop];
            let unit = "";

            if (prop == "kind") {
                const kindSymbol = this.el?.querySelector("[data-symbol]");
                kindSymbol?.setAttribute("href", `#${value}`);

            } else if (prop === "time") {
                const valueAsDate = value;
                const hourRaw = valueAsDate.getHours();
                let hour = hourRaw < 10 ? `0${hourRaw}` : `${hourRaw}`;
                const minute = `${valueAsDate.getMinutes()}`;

                propEl.setAttribute("datetime", `${hour}:${minute}`);
                const format = new Intl.DateTimeFormat(this.lang, {
                    hour: "numeric",
                    minute: "2-digit",
                });
                value = format.format(value);

            } else if (prop === "wind") {
                unit = this.weather.wind_unit;
            } else if (prop === "visibility") {
                unit = this.weather.visibility_unit;
            }
            if (unit !== "") {
                value += ` ${unit}`;
            }
            propEl.innerText = `${value}`;
        });
    }

    toggle(e) {
        e?.preventDefault();
        this.el?.classList.remove("collapsing", "expanding");

        if (this.isCollapsing || !this.el?.open) {
            this.open();
        } else if (this.isExpanding || this.el?.open) {
            this.collapse();
        }
    }

    open() {
        if (this.el) {
            this.el.style.height = `${this.el.offsetHeight}px`;
            this.el.open = true;
            this.expand();
        }
    }

    expand() {
        this.el?.classList.add("expanding");
        this.isExpanding = true;

        const startHeight = this.el?.offsetHeight || 0;
        const summaryHeight = this.summary?.offsetHeight || 0;
        const contentHeight = this.content?.offsetHeight || 0;
        const endHeight = summaryHeight + contentHeight;

        this.animation?.cancel();
        this.animation = this.el?.animate(
            { height: [`${startHeight}px`, `${endHeight}px`] },
            this.animParams
        );
        if (this.animation) {
            this.animation.onfinish = this.animActionsExpand.onfinish;
            this.animation.oncancel = this.animActionsExpand.oncancel;
        }
    }

    collapse() {
        this.el?.classList.add("collapsing");
        this.isCollapsing = true;

        const startHeight = this.el?.offsetHeight || 0;
        const endHeight = this.summary?.offsetHeight || 0;

        this.animation?.cancel();
        this.animation = this.el?.animate(
            { height: [`${startHeight}px`, `${endHeight}px`] },
            this.animParams
        );
        if (this.animation) {
            this.animation.onfinish = this.animActionsCollapse.onfinish;
            this.animation.oncancel = this.animActionsCollapse.oncancel;
        }
    }

    onAnimationFinish(open) {
        if (this.el) {
            this.el.open = open;

            if (this.animation) {
                this.animation = null;
            }
            this.isCollapsing = false;
            this.isExpanding = false;
            this.el.style.height = "";
            this.el.classList.remove("collapsing", "expanding");
        }
    }
}