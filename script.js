window.onload = ()=>{
    main()
}

function main (){
    const root = document.getElementById('root');
    const btn = document.getElementById("btn");
    const output = document.querySelector("#Output");
    const copyBtn = document.querySelector("#CopyBtn");

    btn.addEventListener('click',function(){
        const bgColor = clrGenarate();
        root.style.backgroundColor = bgColor;
        output.value = bgColor;
    });

    copyBtn.addEventListener("click",function(){
        navigator.clipboard.writeText(output.value);
        if(validHex(output.value)){
            toastMessage(`${output.value} copied`)
        }else{
            alert("Invalid Color")
        }
    })

    output.addEventListener("keyup",function(e){
        const color = e.target.value;
        if(color && validHex(color)){
            root.style.backgroundColor = color;
        }
    })
}

function clrGenarate(){
    const red = Math.floor(Math.random()*255);
    const blue = Math.floor(Math.random()*255);
    const green = Math.floor(Math.random()*255);

    return `#${red.toString(16)}${blue.toString(16)}${green.toString(16)}`
}

// Toast Message
function toastMessage(msg){
    const div = document.createElement("div");
    div.innerText = msg;
    div.className = "toast-message toast-message-slide-in";
    div.addEventListener("click",function(){
        div.classList.remove("toast-message-slide-in");
        div.classList.add("toast-message-slide-out");
        div.addEventListener("animationend",function(){
            div.remove();
        })
    })
    document.body.appendChild(div);
}

/**
 * 
 * @param {string} color:;
 */
// user Input
function validHex(color){
    if(color.length !== 7) return false;
    if(color[0]!=='#') return false;

    color = color.substring(1)
    return /^[0-9A-Fa-f]{6}$/i.test(color)
}