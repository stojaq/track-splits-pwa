document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('eventsContainer');
    if (!container) return;

    if (typeof upcomingEvents === 'undefined' || upcomingEvents.length === 0) {
        container.innerHTML = `<p class="text-gray-500 text-center py-8">Nessun evento in programma.</p>`;
        return;
    }

    const now = new Date();
    
    // Sort events by date ascending
    const sortedEvents = [...upcomingEvents].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    let html = '';

    sortedEvents.forEach(event => {
        const eventDate = new Date(event.date);
        
        // Zero out times for pure day comparison
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const eDate = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
        
        const timeDiff = eDate.getTime() - today.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        
        // Skip past events
        if (daysDiff < 0) return;

        let countdownText = '';
        let badgeColor = '';
        
        if (daysDiff === 0) {
            const msDiffExact = eventDate.getTime() - now.getTime();
            if (msDiffExact > 0) {
                const hoursLeft = Math.floor(msDiffExact / (1000 * 60 * 60));
                const minsLeft = Math.floor((msDiffExact % (1000 * 60 * 60)) / (1000 * 60));
                
                if (hoursLeft > 0) {
                    countdownText = `Oggi tra ${hoursLeft}h ${minsLeft}m`;
                } else {
                    countdownText = `Oggi tra ${minsLeft}m`;
                }
                badgeColor = 'bg-red-500 text-white animate-pulse';
            } else {
                countdownText = 'In corso / Terminato';
                badgeColor = 'bg-gray-500 text-white';
            }
        } else if (daysDiff === 1) {
            countdownText = 'Domani!';
            badgeColor = 'bg-orange-500 text-white';
        } else if (daysDiff <= 14) {
            countdownText = `Mancano ${daysDiff} giorni`;
            badgeColor = 'bg-yellow-500 text-white';
        } else {
            countdownText = `Mancano ${daysDiff} giorni`;
            badgeColor = 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300';
        }
        
        const day = eventDate.getDate().toString().padStart(2, '0');
        const monthName = eventDate.toLocaleString('it-IT', { month: 'short' }).toUpperCase();
        const year = eventDate.getFullYear();
        const isThisYear = year === now.getFullYear();
        
        // Type Badge styling
        let typeBadgeStr = '';
        if (event.type) {
            typeBadgeStr = `<span class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 uppercase tracking-wide border border-gray-200 dark:border-gray-700">${event.type}</span>`;
        }

        html += `
        <div class="relative overflow-hidden bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-gray-100 dark:border-dark-border card-transition hover:shadow-md flex flex-row items-stretch p-0 group">
            <!-- Date Section -->
            <div class="bg-primary-50 dark:bg-primary-900/20 w-24 flex-shrink-0 flex flex-col items-center justify-center py-4 px-2 border-r border-gray-100 dark:border-dark-border relative overflow-hidden">
                <span class="text-sm font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider z-10">${monthName}</span>
                <span class="text-4xl font-display font-bold text-gray-900 dark:text-white leading-none my-0.5 z-10">${day}</span>
                ${!isThisYear ? `<span class="text-xs font-semibold text-gray-400 z-10">${year}</span>` : ''}
                
                <!-- Decorative element -->
                <div class="absolute -bottom-4 -right-4 w-16 h-16 bg-primary-500/10 rounded-full blur-xl group-hover:bg-primary-500/20 transition-colors"></div>
            </div>
            
            <!-- Info Section -->
            <div class="p-4 py-5 flex-grow flex flex-col justify-center pr-12">
                <div class="flex flex-wrap gap-2 items-center mb-2">
                    ${typeBadgeStr}
                </div>
                <h3 class="text-lg font-bold text-gray-900 dark:text-white leading-tight mb-2">${event.name}</h3>
                
                <div class="flex flex-col gap-2 mt-auto">
                    <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        ${event.location}
                    </div>
                    <div class="flex items-center">
                        <span class="text-[11px] font-bold px-2.5 py-1 rounded-md ${badgeColor} uppercase tracking-wide flex items-center gap-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                            ${countdownText}
                        </span>
                    </div>
                </div>
            </div>
            
            <!-- Action Button -->
            ${event.link && event.link !== '#' ? `
            <a href="${event.link}" target="_blank" aria-label="Vai al sito dell'evento" class="absolute top-1/2 -translate-y-1/2 right-4 p-2.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/30 rounded-full transition-colors active:scale-95">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
            ` : ''}
        </div>
        `;
    });

    if (html === '') {
        html = `
        <div class="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 text-center flex flex-col items-center justify-center">
            <div class="w-16 h-16 bg-gray-100 dark:bg-gray-800 text-gray-400 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            </div>
            <p class="text-gray-600 dark:text-gray-300 font-medium">Nessun evento futuro in programma.</p>
            <p class="text-gray-400 text-sm mt-1">Torna a controllare più avanti.</p>
        </div>`;
    }

    container.innerHTML = html;
});
