const widthElement = document.getElementById("width");
const heightElement = document.getElementById("height");

document.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("changeColor").addEventListener("click", async () => {
    const width = validateSize(Number(widthElement.value));
    const height = validateSize(Number(heightElement.value));

    document.getElementById("loading-wrapper").style.display = "block";
    document.getElementById("content-wrapper").style.display = "none";

    try {
      fetch(`https://picsum.photos/${width}/${height}`)
        .then((res) => {
          document.getElementById("result").setAttribute("src", res.url);
          navigator.clipboard.writeText(res.url);
        })
        .finally(() => {
          document.getElementById("loading-wrapper").style.display = "none";
          document.getElementById("content-wrapper").style.display = "flex";
          document.getElementById("info-text").style.display = "block";
          document.getElementById("result").style.display = "block";
        });
    } catch (error) {
      console.error(error);
    }
  });
});

function validateSize(size) {
  const DEFAULT_SIZE = 100;

  if (!size) return DEFAULT_SIZE;
  if (size <= 0) return DEFAULT_SIZE;
  if (size > 9999) return DEFAULT_SIZE;

  return size;
}
