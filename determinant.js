let matris = []
let remove = (matris,satr,soton) => 
matris.filter((_,i) => i !== satr).map(satr => satr.filter((_,i) => i !==soton));
let determinant = matris => {
    if (matris.length === 2) return matris[0][0] * matris[1][1] - matris[0][1] * matris[1][0];
    return matris[0].reduce(
        (det,element,i) => det + element * Math.pow(-1, i) * determinant(remove(matris, 0, i))
        ,0
    );
} ;
document.getElementById("form1").addEventListener("submit",function(e){
    e.preventDefault()
    let length = document.getElementById("input2").value
    if (isNaN(length)||length === '') {
        window.alert('please enter a number for length!')
    }
    let len = Number(length)
    if (document.getElementById('selectWay').value === "random") {
        for (let i = 0; i < len; i++) {
            matris.push([])
            for (let j = 0; j < len; j++) {
                matris[i].push(Math.floor(Math.random() * 10))
            }
        }
        for (let b = 0; b < len; b++) {
            let newP = document.createElement('p')
            document.getElementById('showMatris').appendChild(newP)
            for (let v = 0; v < len; v++) {
                let newSpan = document.createElement('span')
                newSpan.innerHTML = `${matris[b][v]  }`
                newP.appendChild(newSpan)
            }
        }
        let showDeter = document.createElement('p')
        showDeter.innerHTML = `determinant is : ${determinant(matris)}`
        document.querySelector('body').appendChild(showDeter)
        document.getElementById('submitButton').hidden = true

    }else if (document.getElementById('selectWay').value === "manually") {
        for (let x = 0; x < len; x++) {
            let newDiv = document.createElement('div')
            newDiv.setAttribute('class','inputDiv')
            document.getElementById('showMatris').appendChild(newDiv)
            for (let y = 0; y < len; y ++) {
                let newInput = document.createElement('input')
                newInput.setAttribute('type','text')
                newInput.setAttribute('class','setNumbers')
                newInput.placeholder = `a [${x+1} , ${y+1}]`
                newDiv.appendChild(newInput)
            }
        }
        let newButton = document.createElement('button')
        newButton.innerHTML = 'submit'
        newButton.setAttribute('id','manuallySubmit')
        document.querySelector('body').appendChild(newButton)
        newButton.addEventListener('click', function (e) {
            e.preventDefault()
            for (let a = 0; a < len; a++) {
                matris.push([])
                for (let b = 0; b < len; b++) {
                    let parentDiv = document.getElementsByClassName('inputDiv')
                    matris[a].push(Number(parentDiv[a].children[b].value))
                }
            }
            let showDeter = document.createElement('p')
            showDeter.innerHTML = `determinant is : ${determinant(matris)}`
            document.querySelector('body').appendChild(showDeter)
            this.hidden = true
        }) 
        document.getElementById('submitButton').hidden = true
    }
})