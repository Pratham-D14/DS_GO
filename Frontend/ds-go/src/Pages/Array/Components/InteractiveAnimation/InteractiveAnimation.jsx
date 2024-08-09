import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import "./InteractiveAnimation.css";

// Register GSAP Draggable plugin
gsap.registerPlugin(Draggable);

function InteractiveAnimation(props) {
  const options = ["Option 1", "Option 2", "Option 3", "Option 4"];
  const dropAreas = useRef([]);
  const dragAreas = useRef([]);
  const originalPositions = useRef([]);
  const [droppedElements, setDroppedElements] = useState(
    Array(options.length).fill(null)
  );

  useEffect(() => {
    // Save the original positions of draggable elements
    originalPositions.current = dragAreas.current.map((el) => ({
      x: el.getBoundingClientRect().left - window.scrollX,
      y: el.getBoundingClientRect().top - window.scrollY,
    }));

    // Initialize Draggable for each drag area
    dragAreas.current.forEach((dragArea, index) => {
      Draggable.create(dragArea, {
        bounds: "body",
        onDrag: function () {
          let isOverDropArea = false;
          dropAreas.current.forEach((dropArea, dropIndex) => {
            // Check if the draggable is over a drop area and if the drop area is available
            if (
              this.hitTest(dropArea, "50%") &&
              (droppedElements[dropIndex] === null ||
                droppedElements[dropIndex] === index)
            ) {
              gsap.to(this.target, {
                duration: 0.3,
                scale: 1.1,
                zIndex: 1000,
                opacity: 0.8,
              });
              dropArea.classList.add("active");
              isOverDropArea = true;
            } else {
              dropArea.classList.remove("active");
            }
          });
          // Reset styles if not over any drop area
          if (!isOverDropArea) {
            gsap.to(this.target, {
              duration: 0.3,
              scale: 1,
              zIndex: 1,
              opacity: 1,
            });
          }
        },
        onDragEnd: function () {
          let hasDroppedInArea = false;
          dropAreas.current.forEach((dropArea, dropIndex) => {
            // If dropped inside a valid drop area, align and fix the position
            if (
              this.hitTest(dropArea, "50%") &&
              (droppedElements[dropIndex] === null ||
                droppedElements[dropIndex] === index)
            ) {
              hasDroppedInArea = true;
              setDroppedElements((prev) => {
                const newDroppedElements = [...prev];
                newDroppedElements[dropIndex] = index;
                return newDroppedElements;
              });
              // Align the draggable element perfectly inside the drop area
              const dropRect = dropArea.getBoundingClientRect();
              const targetRect = this.target.getBoundingClientRect();
              const offsetX =
                dropRect.left - targetRect.left + window.scrollX - 3;
              const offsetY = dropRect.top - targetRect.top + window.scrollY;
              gsap.to(this.target, {
                duration: 0.6,
                x: `+=${offsetX}`,
                y: `+=${offsetY}`,
                scale: 1,
                opacity: 1,
                zIndex: 1,
                onComplete: () => {
                  dropAreas.current.forEach((dropArea) => {
                    dropArea.classList.remove("active");
                  });
                },
              });
            }
          });

          if (!hasDroppedInArea) {
            // If not dropped in a valid area, reset to original position
            resetToOriginalPosition(this.target, index);
            // Update the droppedElements state to reflect that the element is no longer in a drop area
            setDroppedElements((prev) => {
              const newDroppedElements = [...prev];
              const elementIndex = newDroppedElements.indexOf(index);
              if (elementIndex !== -1) {
                newDroppedElements[elementIndex] = null;
              }
              return newDroppedElements;
            });

            document.getElementById("dragarea").style.transform =
              "translate3d(0px, 0px, 0px)";
          }
        },
      });
    });
  }, [droppedElements]);

  const resetToOriginalPosition = (target, index) => {
    const originalPosition = originalPositions.current[index];

    // Calculate the difference to reset the position
    const currentRect = target.getBoundingClientRect();
    const offsetX = originalPosition.x - currentRect.left + window.scrollX;
    const offsetY = originalPosition.y - currentRect.top + window.scrollY;

    gsap.to(target, {
      duration: 0.6,
      x: `+=${offsetX}`,
      y: `+=${offsetY}`,
      scale: 1,
      opacity: 1,
      zIndex: 1,
      onComplete: () => {
        dropAreas.current.forEach((dropArea) => {
          dropArea.classList.remove("active");
        });
      },
    });
  };

  return (
    <div id="screen-2" className={`screen2-div ${props.className}`}>
      <div className="methodsExplanation">
        <h1>Methods of an Array:</h1>
        <p class="description">
          Methods are like actions you can do with an array. They help you add,
          remove, or change items in the array.
        </p>
        <ul>
          <li>
            <b>Push:</b> This method lets you add something to the end of an
            array. For example, if your array is a list of numbers, you can add
            another number to the end.
          </li>

          <li>
            <b>pop: </b>This method lets you take the last item off the array.
            It removes the last thing on your list and gives it back to you.
          </li>
        </ul>
      </div>

      <div className="interactive-screen">
        <div className="droparea-div">
          {options.map((_, index) => (
            <div className="flex" key={index}>
              <div className="margin-right"></div>
              <div
                className="droparea"
                ref={(el) => (dropAreas.current[index] = el)}
              ></div>
            </div>
          ))}
        </div>

        <div className="options flex margin-top">
          {options.map((option, index) => (
            <div
              id="dragarea"
              className="flex margin-right dragarea"
              key={option}
              ref={(el) => (dragAreas.current[index] = el)}
              data-index={index}
            >
              <div className="margin-right icon">data</div>
              <div>{option}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InteractiveAnimation;
