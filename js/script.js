/* TERMINAL TYPE EFFECT WITH GLITCH */
      const bootLines = [
        "Initializing CST Archive...",
        "Loading Bogura Polytechnic Institute...",
        "Recovering student data...",
        "ERROR: FILE SYSTEM DAMAGED",
        "Attempting reconstruction...",
        "ACCESS GRANTED.........",
      ];

      const bootContainer = document.getElementById("boot");

      let lineIndex = 0;

      function typeLine(text, callback) {
        let i = 0;
        const div = document.createElement("div");
        div.classList.add("boot-line");
        bootContainer.appendChild(div);

        const interval = setInterval(() => {
          let char = text[i];

          // random glitch char
          // if(Math.random() > 0.8){
          //   char = String.fromCharCode(33 + Math.random()*94);
          // }

          div.textContent += char;
          i++;

          if (i >= text.length) {
            clearInterval(interval);
            setTimeout(callback, 300);
          }
        }, 30);
      }

      function runBoot() {
        if (lineIndex < bootLines.length) {
          typeLine(bootLines[lineIndex], () => {
            lineIndex++;
            runBoot();
          });
        } else {
          setTimeout(() => {
            document.getElementById("boot").style.display = "none";
            document.getElementById("main").style.display = "block";
          }, 500);
        }
      }

      runBoot();

      /* SCREEN BREAK */
      setInterval(() => {
        document.body.classList.add("break");
        setTimeout(() => document.body.classList.remove("break"), 200);
      }, 4000);