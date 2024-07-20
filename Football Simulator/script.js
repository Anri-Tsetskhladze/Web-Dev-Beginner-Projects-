document.getElementById('startButton').addEventListener('click', startMatch);

function startMatch() {
    resetMatch();
    const logElement = document.getElementById('log');
    logElement.innerHTML = '';

    let scoreA = 0;
    let scoreB = 0;

    const matchDuration = 90; 
    const events = ['goal', 'miss', 'foul', 'corner', 'offside'];

    for (let minute = 1; minute <= matchDuration; minute++) {
        const event = events[Math.floor(Math.random() * events.length)];

        switch (event) {
            case 'goal':
                if (Math.random() > 0.5) {
                    scoreA++;
                    logEvent(`Minute ${minute}: Team A scores!`);
                } else {
                    scoreB++;
                    logEvent(`Minute ${minute}: Team B scores!`);
                }
                break;
            case 'miss':
                logEvent(`Minute ${minute}: A shot was missed.`);
                break;
            case 'foul':
                logEvent(`Minute ${minute}: A foul occurred.`);
                break;
            case 'corner':
                logEvent(`Minute ${minute}: A corner kick was awarded.`);
                break;
            case 'offside':
                logEvent(`Minute ${minute}: Offside.`);
                break;
        }

        updateScores(scoreA, scoreB);
    }

    logEvent(`Final Score: Team A ${scoreA} - ${scoreB} Team B`);
}

function logEvent(message) {
    const logElement = document.getElementById('log');
    const p = document.createElement('p');
    p.textContent = message;
    logElement.appendChild(p);
}

function updateScores(scoreA, scoreB) {
    document.getElementById('scoreA').textContent = scoreA;
    document.getElementById('scoreB').textContent = scoreB;
}

function resetMatch() {
    document.getElementById('scoreA').textContent = '0';
    document.getElementById('scoreB').textContent = '0';
}