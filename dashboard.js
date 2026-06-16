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

// =========================
// CARREGAR CANAIS
// =========================

fetch('/api/channels')
.then(res => res.json())
.then(channels => {

    const select =
    document.getElementById('channelSelect');

    if(!select) return;

    select.innerHTML = '';

    channels.forEach(channel => {

        const option =
        document.createElement('option');

        option.value = channel.id;

        option.textContent =
        `# ${channel.name}`;

        select.appendChild(option);

    });

})
.catch(console.error);

// =========================
// ENVIAR EMBED
// =========================

document
.getElementById('sendEmbed')
?.addEventListener('click', async () => {

    try{

        const response =
        await fetch('/api/send-embed',{

            method:'POST',

            headers:{
                'Content-Type':'application/json'
            },

            body:JSON.stringify({

                channelId:
                document.getElementById('channelSelect').value,

                title:
                document.getElementById('title').value,

                description:
                document.getElementById('description').value,

                color:
                document.getElementById('color').value,

                author:
                document.getElementById('author').value,

                footer:
                document.getElementById('footer').value,

                image:
                document.getElementById('image').value

            })

        });

        const data =
        await response.json();

        if(data.success){

            alert('✅ Embed enviada com sucesso!');

        }else{

            alert('❌ Erro ao enviar embed.');

        }

    }catch(err){

        console.error(err);

        alert('❌ Erro ao conectar com o servidor.');

    }document
.getElementById('sendEmbed')
?.addEventListener('click', async () => {

    const response = await fetch(
        '/api/send-embed',
        {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({

                channelId:
                document.getElementById('channelSelect').value,

                title:
                document.getElementById('title').value,

                description:
                document.getElementById('description').value,

                color:
                document.getElementById('color').value,

                author:
                document.getElementById('author').value,

                footer:
                document.getElementById('footer').value,

                image:
                document.getElementById('image').value

            })
        }
    );

    const data =
    await response.json();

    if(data.success){

        alert('Embed enviada com sucesso!');

    }else{

        alert('Erro ao enviar embed.');

    }

});

});
