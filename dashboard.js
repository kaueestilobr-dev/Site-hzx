const title = document.getElementById("title");
const description = document.getElementById("description");
const color = document.getElementById("color");
const image = document.getElementById("image");
const author = document.getElementById("author");
const footer = document.getElementById("footer");

function updatePreview() {

    document.getElementById("previewTitle").innerText =
    title?.value || "Título";

    document.getElementById("previewDescription").innerText =
    description?.value || "Descrição da embed...";

    document.getElementById("previewAuthor").innerText =
    author?.value || "Autor";

    document.getElementById("previewFooter").innerText =
    footer?.value || "HzX Vision";

    document.getElementById("embedBar").style.background =
    color?.value || "#7b2cff";

    const img =
    document.getElementById("previewImage");

    if(image?.value){

        img.src = image.value;
        img.style.display = "block";

    }else{

        img.style.display = "none";

    }

}

title?.addEventListener("input", updatePreview);
description?.addEventListener("input", updatePreview);
author?.addEventListener("input", updatePreview);
footer?.addEventListener("input", updatePreview);
color?.addEventListener("input", updatePreview);
image?.addEventListener("input", updatePreview);

updatePreview();
