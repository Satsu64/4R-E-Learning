// ==========================================
// R.B. (Recovery Buddy) - Mascot Logic
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  // 1. Inject the Mascot HTML/SVG into the page
  const mascotHTML = `
        <div id="rb-container" class="rb-floating">
            <!-- Speech Bubble -->
            <div id="rb-bubble" class="rb-bubble hidden">
                <span id="rb-text">Hi! I'm R.B. (Recovery Buddy)!</span>
            </div>

            <!-- R.B. SVG Drawing -->
            <svg id="rb-svg" viewBox="0 0 150 160" width="130" height="140">
                <!-- Zzz for sleeping state -->
                <text id="rb-zzz" x="110" y="30" font-family="Comic Sans MS, sans-serif" font-size="20" font-weight="bold" fill="#333" opacity="0">Zzz</text>
                
                <g id="rb-body-group">
                    <!-- Terminals (Top nubs) -->
                    <rect x="55" y="15" width="8" height="12" rx="3" fill="#333" />
                    <rect x="85" y="15" width="8" height="12" rx="3" fill="#333" />

                    <!-- Left Arm (Hand on hip) -->
                    <path id="rb-arm-l" d="M 45 65 L 25 80 L 35 95" fill="none" stroke="#111" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <circle cx="35" cy="95" r="4.5" fill="#111"/>

                    <!-- Right Arm (Waving) -->
                    <path id="rb-arm-r" d="M 105 65 L 125 50 L 120 30" fill="none" stroke="#111" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" style="transform-origin: 105px 65px; transition: transform 0.3s;"/>
                    <circle id="rb-hand-r" cx="120" cy="30" r="4.5" fill="#111" style="transform-origin: 105px 65px; transition: transform 0.3s;"/>

                    <!-- Legs -->
                    <path d="M 60 115 L 55 145" fill="none" stroke="#111" stroke-width="4.5" stroke-linecap="round"/>
                    <ellipse cx="50" cy="145" rx="7" ry="3.5" fill="#111"/>
                    <path d="M 90 115 L 95 145" fill="none" stroke="#111" stroke-width="4.5" stroke-linecap="round"/>
                    <ellipse cx="100" cy="145" rx="7" ry="3.5" fill="#111"/>

                    <!-- Main Cylinder Body -->
                    <rect x="45" y="25" width="60" height="90" rx="12" fill="#ea580c" stroke="#111" stroke-width="4.5"/>
                    <path d="M 45 70 L 105 70 L 105 103 Q 105 115 93 115 L 57 115 Q 45 115 45 103 Z" fill="#ffffff" stroke="#111" stroke-width="4.5"/>
                    
                    <!-- The "R" -->
                    <text x="75" y="103" font-family="'Segoe UI', sans-serif" font-size="28" font-weight="900" text-anchor="middle" fill="#111">R</text>

                    <!-- Face -->
                    <g id="rb-face">
                        <!-- Open Eyes -->
                        <ellipse cx="63" cy="45" rx="4.5" ry="8" fill="#111" class="rb-eye" />
                        <ellipse cx="87" cy="45" rx="4.5" ry="8" fill="#111" class="rb-eye" />
                        <!-- Closed Eyes (Hidden initially) -->
                        <path id="rb-eye-closed-l" d="M 58 45 Q 63 50 68 45" fill="none" stroke="#111" stroke-width="3" stroke-linecap="round" opacity="0"/>
                        <path id="rb-eye-closed-r" d="M 82 45 Q 87 50 92 45" fill="none" stroke="#111" stroke-width="3" stroke-linecap="round" opacity="0"/>
                        
                        <!-- Mouth -->
                        <path id="rb-mouth" d="M 68 60 Q 75 66 82 60" fill="none" stroke="#111" stroke-width="3.5" stroke-linecap="round"/>
                    </g>
                </g>
            </svg>
        </div>
    `;

  document.body.insertAdjacentHTML("beforeend", mascotHTML);

  // 2. Logic Variables
  const rbContainer = document.getElementById("rb-container");
  const bubble = document.getElementById("rb-bubble");
  const textEl = document.getElementById("rb-text");

  let idleTimer = null;
  let isSleeping = false;
  let isTalking = false;

  const facts = [
    "Recovery is the 4th R! It turns non-recyclable waste into clean energy! ⚡",
    "Did you know? Waste-to-Energy plants reduce landfill volume by up to 90%!",
    "Batteries like me shouldn't go in the trash. We need special Recovery! 🔋",
    "Recycling saves energy, but Recovery CREATES energy from what's left over!",
    "Food scraps can be recovered into biogas to power homes! 🌱🔥",
    "Always Reduce first, Reuse second, Recycle third, and Recover last!",
  ];

  // 3. Functions
  function speak(text, duration = 4000) {
    textEl.textContent = text;
    bubble.classList.remove("hidden");
    wakeUp();

    // Talking animation trigger
    rbContainer.classList.add("rb-talking");
    isTalking = true;

    setTimeout(() => {
      bubble.classList.add("hidden");
      rbContainer.classList.remove("rb-talking");
      isTalking = false;
    }, duration);

    resetIdleTimer();
  }

  function wakeUp() {
    if (isSleeping) {
      rbContainer.classList.remove("rb-sleeping");
      isSleeping = false;
    }
  }

  function fallAsleep() {
    if (!isTalking) {
      rbContainer.classList.add("rb-sleeping");
      textEl.textContent = "Zzz... 🔋";
      bubble.classList.remove("hidden");
      isSleeping = true;
    }
  }

  function resetIdleTimer() {
    clearTimeout(idleTimer);
    // Falls asleep after 15 seconds of no interaction
    idleTimer = setTimeout(fallAsleep, 15000);
  }

  // 4. Interactions
  rbContainer.addEventListener("click", () => {
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    speak(randomFact, 5000);
  });

  // 5. Initial Load (Intro)
  setTimeout(() => {
    speak("Hi! I'm R.B. (Recovery Buddy)! Click me for 4R facts!", 5000);
  }, 1000);
});
