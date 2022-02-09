function adicionarCanais(ini, fim, verify) {
    fetch("data.json")
        .then(res => res.json())
        .then(data => {
            for (let i = ini; i < fim; i++) {
                let container = document.getElementsByClassName("sc-streams")[0].innerHTML
                document.getElementsByClassName("sc-streams")[0].innerHTML = container +
                    `<div class="sc-lc-card">
    <div class="sc-lc-img">
        <img src="${data[i].imagem}" alt=""
            class="stream-image">
        <img src="/twitch/assets/live.svg" alt="" class="live-icon">
        <div class="sc-lc-titulo">
            <div class="sc-lc-pp">
                <img src="${data[i].profile}"
                    alt="">
            </div>
            <div class="sc-lc-info">
                <a href="#">
                    <h3 class="hover-purple">${data[i].titulo}</h3>
                </a>
                <a href="#">
                    <p class="hover-purple">${data[i].nome}</p>
                </a>
                <a href="#">
                    <p class="hover-purple">${data[i].jogo}</p>
                </a>
                <div>
                    <a href="#" class="sc-lc-tag">${data[i].tag1}</a>
                    <a href="#" class="sc-lc-tag">${data[i].tag2}</a>
                </div>
            </div>
            <div class="sc-lc-elipse">
                <button class="btn-elipse-sc-lc"><img src="/twitch/assets/elipse.svg" alt=""
                        class="elipse"></button>
            </div>
        </div>
    </div>
</div>`
            }
        })

    if (verify == true) {
        document.getElementsByClassName("lc-show-more")[0].style.marginBottom = '20px';
        document.getElementsByClassName("sc-sm-btn")[0].style.display = 'none';
    }
}

var showLessF = 0
var showLessR = 0
var showMoreF = 0
var showMoreR = 0

function addFollowed(ini, fim, verify, channel, btnNum) {

    fetch("data.json")
        .then(res => res.json())
        .then(data => {
            if (channel == 'followed') showMoreF += 1
            else showMoreR += 1
            for (let i = ini; i < fim; i++) {
                let container = document.getElementsByClassName(`${channel}-box`)[0].innerHTML
                document.getElementsByClassName(`${channel}-box`)[0].innerHTML = container +
                    `    <div class="${channel}-streamers">
                    <a href="#" class="fs-a">
                        <img src="${data[i].profile}" alt="" class="fs-pp"></a>
                    <div class="fs-ng">
                        <p class="nome-streamer" title="${data[i].nome}">${data[i].nome}</p>
                        <p class="jogo-followed" title="${data[i].jogo}">${data[i].jogo}</p>
                    </div>
                    <img src="/twitch/assets/bola-vermelha.svg" alt="" class="fs-bv">
                    <span class="fs-views">${data[i].views}</span>
                </div>`
            }
            
        })



    if (verify == true && channel == 'followed' && showLessF === 0) {
        let btn = document.createElement("button")
        btn.className = "fs-btn-mm"
        btn.id = "followed-id"
            btn.setAttribute("onclick", "removeFollowed('followed')")
        let span = document.createElement("span")
        span.className = "fs-mm"
        let texto = document.createTextNode("Mostrar menos")
        span.appendChild(texto)
        btn.appendChild(span)

        document.getElementsByClassName("fs-div-mm")[btnNum].appendChild(btn)

        showLessF = 1
    }

    if (verify == true && channel == 'recommended' && showLessR === 0) {
        let btn = document.createElement("button")
        btn.className = "fs-btn-mm"
        btn.id = "recommended-id"
            btn.setAttribute("onclick", "removeFollowed('recommended')")
        let span = document.createElement("span")
        span.className = "fs-mm"
        let texto = document.createTextNode("Mostrar menos")
        span.appendChild(texto)
        btn.appendChild(span)

        document.getElementsByClassName("fs-div-mm")[btnNum].appendChild(btn)

        showLessR = 1
    }
}

function removeFollowed(channel) {


    let max = document.getElementsByClassName(`${channel}-streamers`).length - 1
    let min = max - 5

    if (channel == 'followed') showMoreF -= 1
    else showMoreR -= 1

    for (let i = max; i > min; i--) {
        let child = document.getElementsByClassName(`${channel}-streamers`)[i]
        document.getElementsByClassName(`${channel}-box`)[0].removeChild(child)
    }

    if (channel == 'followed' && showMoreF == 1) {
        let child = document.getElementById('followed-id')
        document.getElementsByClassName('fs-div-mm')[0].removeChild(child)
        showLessF = 0
    }

    if (channel == 'recommended' && showMoreR == 1) {
        console.log(document.getElementsByClassName('fs-div-mm')[1])
        let child = document.getElementById('recommended-id')
        document.getElementsByClassName('fs-div-mm')[1].removeChild(child)
        showLessR = 0
    }
}


window.onload = adicionarCanais(0, 5, false);
window.onload = addFollowed(0, 5, false, "followed");
window.onload = addFollowed(0, 5, false, "recommended");
