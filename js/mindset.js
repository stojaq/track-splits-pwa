document.addEventListener('DOMContentLoaded', () => {
    
    // UI Elements
    const introScreen = document.getElementById('introScreen');
    const quizContainer = document.getElementById('quizContainer');
    const resultContainer = document.getElementById('resultContainer');
    const startBtn = document.getElementById('startBtn');
    const restartBtn = document.getElementById('restartBtn');
    
    const questionCard = document.getElementById('questionCard');
    const questionCategory = document.getElementById('questionCategory');
    const questionText = document.getElementById('questionText');
    const answersContainer = document.getElementById('answersContainer');
    
    const progressText = document.getElementById('progressText');
    const progressBar = document.getElementById('progressBar');
    
    const profileTitle = document.getElementById('profileTitle');
    const profileDesc = document.getElementById('profileDesc');
    const profileAdvice = document.getElementById('profileAdvice');

    // State
    let currentQuestionIndex = 0;
    let scores = {
        ansia: 0,
        focus: 0,
        resilienza: 0,
        fiducia: 0
    };

    // --- Init ---
    startBtn.addEventListener('click', () => {
        introScreen.classList.add('hidden');
        quizContainer.classList.remove('hidden');
        quizContainer.classList.add('flex');
        loadQuestion(0);
    });

    restartBtn.addEventListener('click', () => {
        currentQuestionIndex = 0;
        scores = { ansia: 0, focus: 0, resilienza: 0, fiducia: 0 };
        resultContainer.classList.add('hidden');
        resultContainer.classList.remove('flex');
        quizContainer.classList.remove('hidden');
        quizContainer.classList.add('flex');
        loadQuestion(0);
    });

    // --- Core Logic ---
    function loadQuestion(index) {
        const q = mindsetQuestions[index];
        
        // Update Progress
        const percent = ((index + 1) / mindsetQuestions.length) * 100;
        progressText.textContent = `Domanda ${index + 1} di ${mindsetQuestions.length}`;
        progressBar.style.width = `${percent}%`;

        // Update Text
        questionCategory.textContent = q.category;
        questionText.textContent = q.text;

        // Render Answers
        answersContainer.innerHTML = '';
        q.answers.forEach((ans, i) => {
            const btn = document.createElement('button');
            btn.className = "w-full text-left p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 dark:hover:border-primary-500 transition-all font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-dark-card active:scale-[0.98]";
            btn.textContent = ans.text;
            btn.onclick = () => handleAnswer(ans.scores, btn);
            answersContainer.appendChild(btn);
        });

        // Animate In
        questionCard.classList.remove('fade-out');
        questionCard.classList.add('fade-in');
    }

    function handleAnswer(answerScores, btnElement) {
        // Highlight selection briefly
        btnElement.classList.add('border-primary-500', 'bg-primary-100', 'dark:bg-primary-800');
        
        // Add scores
        scores.ansia += (answerScores.ansia || 0);
        scores.focus += (answerScores.focus || 0);
        scores.resilienza += (answerScores.resilienza || 0);
        scores.fiducia += (answerScores.fiducia || 0);

        // Animate Out
        questionCard.classList.remove('fade-in');
        questionCard.classList.add('fade-out');

        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < mindsetQuestions.length) {
                loadQuestion(currentQuestionIndex);
            } else {
                showResults();
            }
        }, 400); // Wait for fade-out animation
    }

    function showResults() {
        quizContainer.classList.add('hidden');
        quizContainer.classList.remove('flex');
        
        // Calculate Profile
        let assignedProfile = mindsetProfiles.perfezionista; // default
        
        // Controlla le condizioni in ordine
        for (const key in mindsetProfiles) {
            if (key !== 'perfezionista' && mindsetProfiles[key].condition(scores)) {
                assignedProfile = mindsetProfiles[key];
                break;
            }
        }

        // Render Profile
        profileTitle.textContent = assignedProfile.title;
        profileDesc.textContent = assignedProfile.description;
        
        profileAdvice.innerHTML = '';
        assignedProfile.advice.forEach(adv => {
            const li = document.createElement('li');
            li.className = "flex gap-3 text-gray-700 dark:text-gray-300";
            li.innerHTML = `
                <div class="mt-1 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="text-primary-500"><path d="M20 6 9 17l-5-5"/></svg>
                </div>
                <span>${adv}</span>
            `;
            profileAdvice.appendChild(li);
        });

        resultContainer.classList.remove('hidden');
        resultContainer.classList.add('flex');
        
        // Normalize scores for the radar chart (approx max 40, min -40 since there are 20 questions)
        // formula: ((score + 20) / 40) * 100
        const normAnsia = Math.max(0, Math.min(100, Math.round(((scores.ansia + 20) / 40) * 100)));
        const normFocus = Math.max(0, Math.min(100, Math.round(((scores.focus + 20) / 40) * 100)));
        const normResilienza = Math.max(0, Math.min(100, Math.round(((scores.resilienza + 20) / 40) * 100)));
        const normFiducia = Math.max(0, Math.min(100, Math.round(((scores.fiducia + 15) / 30) * 100))); // Fiducia has fewer max points

        renderChart([normAnsia, normFocus, normResilienza, normFiducia]);
        setupShare(assignedProfile.title);
    }

    let radarChartInstance = null;

    function renderChart(dataArr) {
        const ctx = document.getElementById('radarChart');
        if (radarChartInstance) {
            radarChartInstance.destroy();
        }

        const isDark = document.documentElement.classList.contains('dark');
        const textColor = isDark ? '#e2e8f0' : '#475569';
        const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

        radarChartInstance = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Gestione Ansia', 'Focus', 'Resilienza', 'Fiducia'],
                datasets: [{
                    label: 'Le tue Skill Mentali',
                    data: dataArr,
                    backgroundColor: 'rgba(59, 130, 246, 0.25)', // primary-500
                    borderColor: '#3b82f6', 
                    pointBackgroundColor: '#2563eb', // primary-600
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#3b82f6',
                    borderWidth: 2,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: { color: gridColor },
                        grid: { color: gridColor },
                        pointLabels: {
                            color: textColor,
                            font: { family: 'Inter, sans-serif', size: 12, weight: '600' }
                        },
                        ticks: { display: false, min: 0, max: 100, stepSize: 25 }
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }

    function setupShare(profileTitle) {
        const shareBtn = document.getElementById('shareProfileBtn');
        if (navigator.share && shareBtn) {
            shareBtn.classList.remove('hidden');
            // Remove previous event listeners by cloning
            const newShareBtn = shareBtn.cloneNode(true);
            shareBtn.parentNode.replaceChild(newShareBtn, shareBtn);
            
            newShareBtn.addEventListener('click', async () => {
                try {
                    await navigator.share({
                        title: "Profilo Mentale Track Splits",
                        text: `🏆 Il mio Mindset in pista è: ${profileTitle}\n\nFai il test psicologico per l'atletica su Track Splits e scopri il tuo archetipo! 🏃‍♂️🧠\n\n#TrackSplits #Mindset`,
                        url: window.location.href
                    });
                } catch (err) {
                    console.log('Condivisione annullata:', err);
                }
            });
        }
    }

});
