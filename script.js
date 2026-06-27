 
    /*
     * ============================================================
     * SECTION 1 — NAVBAR: Add 'scrolled' class on scroll
     * This changes the navbar background from transparent to
     * a blurred dark background when the user scrolls down.
     *
     * Git concept: This is similar to a pre-commit hook —
     * it runs automatically in response to an event.
     * ============================================================
     */
    const navbar = document.getElementById('navbar');

    // 'scroll' event fires every time the user scrolls the page
    window.addEventListener('scroll', function () {
      // If scrolled more than 50px from top, add 'scrolled' class
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });


    /*
     * ============================================================
     * SECTION 2 — HAMBURGER / MOBILE MENU
     * Toggles the mobile navigation drawer open and closed.
     * Also closes the menu when any nav link is clicked.
     * ============================================================
     */
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileNav    = document.getElementById('mobileNav');

    // Toggle menu open/closed when hamburger is clicked
    hamburgerBtn.addEventListener('click', function () {
      // Toggle the 'open' CSS class on both elements
      const isOpen = hamburgerBtn.classList.toggle('open');
      mobileNav.classList.toggle('open');

      // Update ARIA attribute for screen readers
      hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close mobile menu when any link inside it is clicked
    const mobileNavLinks = mobileNav.querySelectorAll('a');
    mobileNavLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        hamburgerBtn.classList.remove('open');
        mobileNav.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      });
    });


    /*
     * ============================================================
     * SECTION 3 — SCROLL-REVEAL ANIMATIONS
     * Uses the Intersection Observer API to detect when elements
     * enter the viewport, then adds a 'visible' class to trigger
     * the CSS animation.
     *
     * Git concept: Intersection Observer = a hook that fires
     * automatically when a condition is met — just like a
     * pre-receive hook fires when a push is received.
     * ============================================================
     */

    // Create the observer — threshold: 0.1 means the element
    // must be at least 10% visible before the animation triggers
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            // Add 'visible' class to trigger the CSS transition
            entry.target.classList.add('visible');

            // Once animated, stop observing (saves memory)
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Find all elements with class 'reveal' and observe them
    document.querySelectorAll('.reveal').forEach(function (el) {
      revealObserver.observe(el);
    });


    /*
     * ============================================================
     * SECTION 4 — ACTIVE NAV LINK HIGHLIGHTING
     * Uses Intersection Observer to track which section is
     * currently visible and highlights the matching nav link.
     *
     * Git concept: Similar to git log --graph showing you
     * which branch HEAD is currently on.
     * ============================================================
     */
    const sections  = document.querySelectorAll('section[id]');
    const navLinks  = document.querySelectorAll('.nav-link');

    // Observer that watches sections and updates nav highlight
    const navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            // Remove 'active' from all nav links
            navLinks.forEach(function (link) {
              link.classList.remove('active');
            });

            // Add 'active' to the link matching the visible section
            const activeLink = document.querySelector(
              '.nav-link[href="#' + entry.target.id + '"]'
            );
            if (activeLink) {
              activeLink.classList.add('active');
            }
          }
        });
      },
      {
        threshold: 0.3 // Section must be 30% visible to be "active"
      }
    );

    sections.forEach(function (section) {
      navObserver.observe(section);
    });


    /*
     * ============================================================
     * SECTION 5 — TERMINAL TAB SWITCHER
     * Each tab in the hero terminal shows different git commands.
     * The content for each tab is stored in the terminalContent object.
     *
     * Git concept: These tabs demonstrate the git workflow —
     * the same file passes through each stage (add → commit → push).
     * ============================================================
     */

    // Content data for each terminal tab
    // Each entry is an array of HTML strings representing terminal lines
    const terminalContent = {

      // Tab 1: git add — staging changes selectively
      add: `
        <div class="terminal-line">
          <span class="prompt">$</span>
          <span class="cmd">git status</span>
        </div>
        <div class="terminal-line">
          <span class="output">On branch feat/homepage</span>
        </div>
        <div class="terminal-line">
          <span class="output">Changes not staged for commit:</span>
        </div>
        <div class="terminal-line">
          <span class="warning">&nbsp;&nbsp;modified:   index.html</span>
        </div>
        <div class="terminal-line">
          <span class="warning">&nbsp;&nbsp;modified:   .env  ← DANGER — DO NOT STAGE</span>
        </div>
        <div class="terminal-line" style="margin-top:8px;">
          <span class="prompt">$</span>
          <span class="cmd">git add -p index.html</span>
        </div>
        <div class="terminal-line">
          <span class="output">Stage this hunk [y,n,q,?]? <span class="success">y</span></span>
        </div>
        <div class="terminal-line" style="margin-top:8px;">
          <span class="prompt">$</span>
          <span class="cmd">git diff --staged</span>
        </div>
        <div class="terminal-line">
          <span class="success">+  &lt;section id="hero"&gt; ← only safe changes staged ✓</span>
        </div>
        <div class="terminal-line" style="margin-top:8px;">
          <span class="prompt">$</span>
          <span class="cursor"></span>
        </div>
      `,

      // Tab 2: git commit — creating a permanent snapshot
      commit: `
        <div class="terminal-line">
          <span class="output"># ✓ Good — Conventional Commit format</span>
        </div>
        <div class="terminal-line" style="margin-top:4px;">
          <span class="prompt">$</span>
          <span class="cmd">git commit -m "feat(hero): add terminal demo widget"</span>
        </div>
        <div class="terminal-line">
          <span class="branch">[feat/homepage e2c1d09]</span>
          <span class="output"> feat(hero): add terminal demo widget</span>
        </div>
        <div class="terminal-line">
          <span class="output">&nbsp;1 file changed, 142 insertions(+), 0 deletions(-)</span>
        </div>
        <div class="terminal-line" style="margin-top:8px;">
          <span class="output"># ✗ BAD — defeats the audit trail</span>
        </div>
        <div class="terminal-line">
          <span class="prompt">$</span>
          <span class="cmd">git commit -m "update"</span>
        </div>
        <div class="terminal-line">
          <span class="warning">&nbsp;&nbsp;← analyst cannot find this in git log</span>
        </div>
        <div class="terminal-line" style="margin-top:8px;">
          <span class="output"># Verify commit is in the audit trail:</span>
        </div>
        <div class="terminal-line">
          <span class="prompt">$</span>
          <span class="cmd">git log --oneline -3</span>
        </div>
        <div class="terminal-line">
          <span class="hash">e2c1d09</span>
          <span class="output"> feat(hero): add terminal demo widget</span>
        </div>
        <div class="terminal-line" style="margin-top:8px;">
          <span class="prompt">$</span>
          <span class="cursor"></span>
        </div>
      `,

      // Tab 3: git push — uploading to remote
      push: `
        <div class="terminal-line">
          <span class="output"># First push — link local branch to remote</span>
        </div>
        <div class="terminal-line">
          <span class="prompt">$</span>
          <span class="cmd">git push -u origin feat/homepage</span>
        </div>
        <div class="terminal-line">
          <span class="branch">Branch 'feat/homepage' set to track 'origin/feat/homepage'</span>
        </div>
        <div class="terminal-line">
          <span class="success">To github.com:ACS-UICTO/website.git</span>
        </div>
        <div class="terminal-line">
          <span class="success">&nbsp;* [new branch]  feat/homepage → feat/homepage</span>
        </div>
        <div class="terminal-line" style="margin-top:8px;">
          <span class="output"># Subsequent pushes are simpler:</span>
        </div>
        <div class="terminal-line">
          <span class="prompt">$</span>
          <span class="cmd">git push</span>
        </div>
        <div class="terminal-line">
          <span class="success">To github.com:ACS-UICTO/website.git</span>
        </div>
        <div class="terminal-line">
          <span class="success">&nbsp;e2c1d09..b7d4c82  feat/homepage → feat/homepage</span>
        </div>
        <div class="terminal-line" style="margin-top:8px;">
          <span class="output"># ⚠ Never force-push to main without team approval:</span>
        </div>
        <div class="terminal-line">
          <span class="warning">$ git push --force  ← DANGEROUS on shared branches</span>
        </div>
        <div class="terminal-line" style="margin-top:8px;">
          <span class="prompt">$</span>
          <span class="cursor"></span>
        </div>
      `,

      // Tab 4: .gitignore — file exclusion rules
      ignore: `
        <div class="terminal-line">
          <span class="output"># Create .gitignore FIRST — before any other file</span>
        </div>
        <div class="terminal-line">
          <span class="prompt">$</span>
          <span class="cmd">cat .gitignore</span>
        </div>
        <div class="terminal-line">
          <span class="output">.env           <span class="success">← secrets protected ✓</span></span>
        </div>
        <div class="terminal-line">
          <span class="output">*.key  *.pem   <span class="success">← keys blocked ✓</span></span>
        </div>
        <div class="terminal-line">
          <span class="output">*.log          <span class="success">← logs excluded ✓</span></span>
        </div>
        <div class="terminal-line">
          <span class="output">node_modules/  <span class="success">← dependencies skipped ✓</span></span>
        </div>
        <div class="terminal-line" style="margin-top:8px;">
          <span class="prompt">$</span>
          <span class="cmd">git status</span>
        </div>
        <div class="terminal-line">
          <span class="output">Untracked files:</span>
        </div>
        <div class="terminal-line">
          <span class="success">&nbsp;index.html   ← ready to stage</span>
        </div>
        <div class="terminal-line">
          <span class="success">&nbsp;.gitignore   ← ready to stage</span>
        </div>
        <div class="terminal-line">
          <span class="warning">&nbsp;.env         ← IGNORED ✓ (never commits)</span>
        </div>
        <div class="terminal-line" style="margin-top:8px;">
          <span class="prompt">$</span>
          <span class="cursor"></span>
        </div>
      `,

      // Tab 5: git log — reading the audit trail
      log: `
        <div class="terminal-line">
          <span class="prompt">$</span>
          <span class="cmd">git log --oneline --graph --all</span>
        </div>
        <div class="terminal-line">
          <span class="branch">* </span>
          <span class="hash">f9a3c11</span>
          <span class="output"> feat(nav): add hamburger menu</span>
        </div>
        <div class="terminal-line">
          <span class="branch">* </span>
          <span class="hash">b7d4c82</span>
          <span class="output"> security: install pre-commit hooks</span>
        </div>
        <div class="terminal-line">
          <span class="branch">* </span>
          <span class="hash">a3f9c12</span>
          <span class="output"> chore: add IAM-safe .gitignore</span>
        </div>
        <div class="terminal-line" style="margin-top:8px;">
          <span class="output"># Forensic search by keyword:</span>
        </div>
        <div class="terminal-line">
          <span class="prompt">$</span>
          <span class="cmd">git log --grep='security' --oneline</span>
        </div>
        <div class="terminal-line">
          <span class="hash">b7d4c82</span>
          <span class="output"> security: install pre-commit hooks</span>
        </div>
        <div class="terminal-line" style="margin-top:8px;">
          <span class="output"># Credential archaeology:</span>
        </div>
        <div class="terminal-line">
          <span class="prompt">$</span>
          <span class="cmd">git log -S "sk_live_" --oneline</span>
        </div>
        <div class="terminal-line">
          <span class="success">&nbsp;&nbsp;(no output — clean history ✓)</span>
        </div>
        <div class="terminal-line" style="margin-top:8px;">
          <span class="prompt">$</span>
          <span class="cursor"></span>
        </div>
      `
    };

    // Get the terminal body element and tab buttons
    const terminalBody = document.getElementById('terminalBody');
    const terminalTabs = document.querySelectorAll('.terminal-tab');

    // Function to switch tab content
    function switchTab(tabName) {
      // Update active tab styling
      terminalTabs.forEach(function (tab) {
        // Check if this tab's data-tab matches the clicked one
        if (tab.dataset.tab === tabName) {
          tab.classList.add('active');
          tab.setAttribute('aria-selected', 'true');
        } else {
          tab.classList.remove('active');
          tab.setAttribute('aria-selected', 'false');
        }
      });

      // Inject the HTML content for this tab into the terminal body
      terminalBody.innerHTML = terminalContent[tabName] || '';
    }

    // Add click listener to each tab button
    terminalTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        switchTab(tab.dataset.tab);
      });
    });

    // Initialise terminal with the 'add' tab on page load
    switchTab('add');

    // Auto-rotate through tabs every 5 seconds to show all concepts
    const tabOrder = ['add', 'commit', 'push', 'ignore', 'log'];
    let currentTabIndex = 0;

    setInterval(function () {
      currentTabIndex = (currentTabIndex + 1) % tabOrder.length;
      switchTab(tabOrder[currentTabIndex]);
    }, 5000); // 5000 milliseconds = 5 seconds


    /*
     * ============================================================
     * SECTION 6 — MODAL (Git Command "Try It" popups)
     * Clicking "Try It" on a command card opens a modal with
     * step-by-step instructions for that git command.
     *
     * Git concept: Modals are like pull requests — they pause
     * the current workflow and ask for attention before continuing.
     * ============================================================
     */

    // Modal step-by-step content for each command
    const modalData = {

      // git add — how to stage safely
      add: {
        title: 'git add — Staging Files Safely',
        subtitle: 'Follow these steps every time you want to stage changes.',
        steps: [
          {
            desc: 'Check what has changed since your last commit',
            code: '$ git status'
          },
          {
            desc: 'Review and stage changes interactively (NEVER use git add .)',
            code: '$ git add -p index.html\n# Git shows each change and asks: Stage? [y/n]'
          },
          {
            desc: 'Verify EXACTLY what will enter the permanent audit trail',
            code: '$ git diff --staged\n# If anything looks wrong — unstage it first!'
          },
          {
            desc: 'If you staged something wrong, unstage it safely',
            code: '$ git restore --staged index.html\n# File stays in working dir — nothing lost'
          }
        ]
      },

      // git commit — creating a proper IAM audit record
      commit: {
        title: 'git commit — Creating the Audit Record',
        subtitle: 'Every commit is a permanent forensic record. Make it count.',
        steps: [
          {
            desc: 'Always run git diff --staged BEFORE committing',
            code: '$ git diff --staged\n# Verify no accidental credentials are staged'
          },
          {
            desc: 'Commit using Conventional Commits format',
            code: '$ git commit -m "feat(section): add events calendar"\n# Format: type(scope): description'
          },
          {
            desc: 'Valid commit types for this course',
            code: 'feat     → new feature\nfix      → bug fix\nsecurity → security change\nchore    → maintenance\ndocs     → documentation'
          },
          {
            desc: 'Verify your commit appears in the audit trail',
            code: '$ git log --oneline -3\n# Your commit should appear at the top'
          }
        ]
      },

      // git push — uploading to remote
      push: {
        title: 'git push — Sharing with the Team',
        subtitle: 'Push your commits to the remote repository on GitHub.',
        steps: [
          {
            desc: 'Make sure your local branch is up to date',
            code: '$ git pull origin main\n# Download latest changes before pushing'
          },
          {
            desc: 'First-time push — link your local branch to remote',
            code: '$ git push -u origin feat/my-feature\n# -u sets the upstream tracking branch'
          },
          {
            desc: 'Subsequent pushes are simpler',
            code: '$ git push\n# Git remembers which remote branch to use'
          },
          {
            desc: 'Check the remote log to confirm your push arrived',
            code: '$ git log --oneline origin/main\n# Your commits should appear at the top'
          }
        ]
      },

      // .gitignore — protecting secrets
      ignore: {
        title: '.gitignore — Protecting Secrets',
        subtitle: 'Set this up BEFORE your first git add. It cannot save already-committed files.',
        steps: [
          {
            desc: 'Create .gitignore immediately after git init',
            code: '$ touch .gitignore\n# Do this BEFORE adding any other files'
          },
          {
            desc: 'Add the minimum required entries',
            code: '$ echo ".env" >> .gitignore\n$ echo "*.key" >> .gitignore\n$ echo "*.pem" >> .gitignore\n$ echo "*.log" >> .gitignore'
          },
          {
            desc: 'Commit .gitignore as your very first commit',
            code: '$ git add .gitignore\n$ git commit -m "chore: add IAM-safe gitignore"'
          },
          {
            desc: 'Verify that .env is being ignored (does not appear)',
            code: '$ git status\n# .env should NOT appear in the output ✓'
          }
        ]
      },

      // git branch — working in isolation
      branch: {
        title: 'git branch — Working in Isolation',
        subtitle: 'Use branches so you never break the main codebase.',
        steps: [
          {
            desc: 'Create a new branch for your feature or fix',
            code: '$ git checkout -b feat/new-section\n# Creates and switches to the new branch'
          },
          {
            desc: 'Work normally — add and commit on this branch',
            code: '$ git add -p myfile.html\n$ git commit -m "feat(section): add about content"'
          },
          {
            desc: 'Push your branch to GitHub for review',
            code: '$ git push -u origin feat/new-section\n# Open a Pull Request on GitHub'
          },
          {
            desc: 'After review and approval, merge into main',
            code: '$ git checkout main\n$ git merge feat/new-section\n$ git push'
          }
        ]
      },

      // git log — reading the audit trail
      log: {
        title: 'git log — Reading the Audit Trail',
        subtitle: 'Use git log for forensic investigation and understanding project history.',
        steps: [
          {
            desc: 'View a compact graph of all branches',
            code: '$ git log --oneline --graph --all --decorate'
          },
          {
            desc: 'Find all commits by a specific author',
            code: '$ git log --author="Harrison" --oneline\n# Or by email: --author="harrison@uicto.edu.ng"'
          },
          {
            desc: 'Search commit messages for keywords (IAM forensics)',
            code: '$ git log --grep="security" --oneline\n$ git log --grep="CVE" --oneline'
          },
          {
            desc: 'Check if a secret was ever committed (credential archaeology)',
            code: '$ git log -S "sk_live_" --oneline\n# No output = clean history ✓'
          }
        ]
      }
    };

    // Open the modal with content for the specified command
    function openModal(commandName) {
      const data = modalData[commandName];
      if (!data) return; // Guard: do nothing if command not found

      // Build the modal HTML from the data object
      let stepsHTML = data.steps.map(function (step, index) {
        return `
          <div class="modal-step">
            <div class="modal-step__num">${index + 1}</div>
            <div class="modal-step__content">
              <div class="modal-step__desc">${step.desc}</div>
              <pre class="modal-step__code">${step.code}</pre>
            </div>
          </div>
        `;
      }).join('');

      // Inject the generated HTML into the modal
      document.getElementById('modalContent').innerHTML = `
        <h2 class="modal__title" id="modalTitle">${data.title}</h2>
        <p class="modal__subtitle">${data.subtitle}</p>
        <div class="modal-steps">${stepsHTML}</div>
      `;

      // Show the modal overlay
      document.getElementById('modalOverlay').classList.add('open');

      // Focus the close button for keyboard accessibility
      document.getElementById('modalClose').focus();

      // Prevent background scrolling while modal is open
      document.body.style.overflow = 'hidden';
    }

    // Close modal function
    function closeModal() {
      document.getElementById('modalOverlay').classList.remove('open');
      document.body.style.overflow = ''; // Restore scrolling
    }

    // Close when the X button is clicked
    document.getElementById('modalClose').addEventListener('click', closeModal);

    // Close when clicking outside the modal box (on the overlay)
    document.getElementById('modalOverlay').addEventListener('click', function (e) {
      // Only close if the click was on the overlay itself, not the modal box
      if (e.target === this) {
        closeModal();
      }
    });

    // Close when Escape key is pressed (keyboard accessibility)
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeModal();
      }
    });


    /*
     * ============================================================
     * SECTION 7 — MEMBERSHIP FORM VALIDATION AND SUBMISSION
     * Validates required fields and simulates a form submission.
     * In a real project, this would POST data to a server API.
     *
     * Git concept: Form validation is like a pre-commit hook —
     * it checks the data before it is permanently submitted.
     * ============================================================
     */
    const joinForm     = document.getElementById('joinForm');
    const formError    = document.getElementById('formError');
    const formSuccess  = document.getElementById('formSuccess');

    joinForm.addEventListener('submit', function (event) {
      // Prevent the form from navigating to a new page (default behaviour)
      event.preventDefault();

      // Hide any previous error message
      formError.style.display = 'none';

      // ── VALIDATION ────────────────────────────────────────────
      // Check all required fields have values
      const firstName  = document.getElementById('firstName').value.trim();
      const lastName   = document.getElementById('lastName').value.trim();
      const email      = document.getElementById('email').value.trim();
      const studentId  = document.getElementById('studentId').value.trim();
      const level      = document.getElementById('level').value;
      const department = document.getElementById('department').value;

      // Validate: all required fields must be filled
      if (!firstName || !lastName || !email || !studentId || !level || !department) {
        formError.style.display = 'block';
        formError.textContent   = '⛔  All required fields must be filled in before submitting.';
        return; // Stop here — do not submit
      }

      // Validate: email must be a valid email format
      // The regex /^[^\s@]+@[^\s@]+\.[^\s@]+$/ matches the pattern: xxx@xxx.xxx
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        formError.style.display = 'block';
        formError.textContent   = '⛔  Please enter a valid email address.';
        return;
      }

      // ── SUBMISSION (simulated) ───────────────────────────────
      // In a real project you would POST the data to an API:
      //
      //   fetch('/api/membership', {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify({ firstName, lastName, email, studentId, level, department })
      //   }).then(res => res.json()).then(data => { ... });
      //
      // For this demo, we just simulate a successful submission:

      // Hide the form and show the success message
      joinForm.style.display       = 'none';
      formSuccess.style.display    = 'block';

      // Log the "commit" to the browser console (educational)
      console.log(
        '%c git commit -m "feat(members): add new ACS member — ' + firstName + ' ' + lastName + '"',
        'color: #00ff9d; font-family: monospace; font-size: 14px;'
      );
    });


    /*
     * ============================================================
     * SECTION 8 — SCROLL-TO-TOP BUTTON
     * Shows a button in the bottom-right corner after the user
     * scrolls down. Clicking it smoothly scrolls back to the top.
     * ============================================================
     */
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    // Show the button when the user scrolls more than 400px
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });

    // Scroll smoothly to top when button is clicked
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
