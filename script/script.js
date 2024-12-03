// Wait for DOM content to fully load
document.addEventListener("DOMContentLoaded", () => {
  const group = document.querySelector(".group.active");
  const middleDescriptions = group.querySelectorAll(".description-box");

  // Hide all middle panel descriptions on initial load
  middleDescriptions.forEach(descBox => {
      descBox.style.display = "none";
  });

  // // Switch between groups
  // groupButtons.forEach(button => {
  //   button.addEventListener("click", () => {
  //     // Activate the selected group button
  //     groupButtons.forEach(btn => btn.classList.remove("active"));
  //     button.classList.add("active");

  //     // Display the corresponding group and hide others
  //     const targetGroup = button.getAttribute("data-group");
  //     groups.forEach(group => {
  //       group.classList.remove("active");
  //       if (group.id === targetGroup) {
  //         group.classList.add("active");
  //       }
  //     });
  //   });
  // });

    // Switch video and highlight the selected thumbnail
    const videoBoxes = group.querySelectorAll(".box");
    videoBoxes.forEach(box => {
        box.addEventListener("click", () => {
            const videoElement = group.querySelector("video");
            const description = group.querySelector(".text-container p");

            // Update video source and descriptions
            const videoSrc = box.getAttribute("data-video");
            const text = box.getAttribute("data-text");
            const boxIndex = Array.from(videoBoxes).indexOf(box);

            videoElement.querySelector("source").src = videoSrc;
            videoElement.load(); // Reload the video
            videoElement.play(); // Automatically play the video

            // Update the right panel description
            description.textContent = text;

            // Update the middle panel: show only the corresponding description box
            middleDescriptions.forEach((descBox, index) => {
                if (index === boxIndex) {
                    descBox.style.display = "block"; // Show the corresponding description
                } else {
                    descBox.style.display = "none"; // Hide others
                }
            });

            // Highlight the selected thumbnail
            group.querySelectorAll(".box").forEach(b => b.classList.remove("active"));
            box.classList.add("active");
        });
    });
    // Automatically play the next video
    const videoElement = group.querySelector("video");
    videoElement.addEventListener("ended", () => {
        const currentIndex = Array.from(videoBoxes).findIndex(box => box.classList.contains("active"));
        const nextIndex = (currentIndex + 1) % videoBoxes.length;
        const nextBox = videoBoxes[nextIndex];

        // Trigger the click event on the next thumbnail to play the video
        nextBox.click();
    });

});


