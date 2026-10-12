/* Page wiring. Students normally edit game.js, not this file. */
(() => {
    let ready = false;
    let failed = false;
    let lastAnnouncement = "";
    const byId = (id) => document.getElementById(id);

    function showError(error) {
        failed = true;
        byId("error").hidden = false;
        byId("error-detail").textContent = error.message || String(error);
        byId("start").disabled = true;
        byId("status").textContent = "Check the error below, then refresh.";
        if (typeof window.stopAllTimers === "function") window.stopAllTimers();
    }
    window.addEventListener("error", (event) => showError(event.error || event.message || "A script could not load. Check the vendor folder."));
    window.addEventListener("unhandledrejection", (event) => showError(event.reason));

    function refreshSummary() {
        if (!ready || failed) return;
        try {
            byId("score").textContent = score;
            byId("time").textContent = secondsLeft;
            byId("best").textContent = getBestScore();
            byId("history").textContent = roundScores.length ? roundScores.map((value, i) => "Round " + (i + 1) + ": " + value).join(" | ") : "No completed rounds yet.";
            byId("start").textContent = playing ? "Restart round" : (roundScores.length ? "Play again" : "Start round");
            const announcement = playing ? "Round in progress. Click the target." : (roundScores.length ? "Round finished. You scored " + score + "." : "Ready when you are.");
            if (announcement !== lastAnnouncement) {
                byId("status").textContent = announcement;
                lastAnnouncement = announcement;
            }
        } catch (error) { showError(error); }
    }
    window.addEventListener("load", () => {
        if (failed) return;
        try {
            if (typeof window.Circle !== "function" || typeof window.main !== "function") {
                throw new Error("The graphics library or game.js did not load. Keep the vendor folder and check script paths in index.html.");
            }
            // Surface exceptions that the graphics library catches internally.
            window.__graphics__.onError = showError;
            main();
            ready = true;
            byId("start").disabled = false;
            byId("start").addEventListener("click", () => {
                try { startRound(); refreshSummary(); } catch (error) { showError(error); }
            });
            refreshSummary();
            setInterval(refreshSummary, 100);
        } catch (error) { showError(error); }
    });
})();
