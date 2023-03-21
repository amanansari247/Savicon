let myinput =[]
const inputel = document.getElementById("input")
const inputbtn = document.getElementById("btn")
const ulel = document.getElementById("ul-ele")
const deletebutton  = document.getElementById("del-btn")
const savetab = document.getElementById("save-tab")
const datalocal = JSON.parse(localStorage.getItem("mylist"))
let inputispressed = false;

if(datalocal){
    myinput = datalocal
    renderlist(myinput)
}

savetab.addEventListener("click",function(){
   chrome.tabs.query({active:true,currentWindow: true},function(tabs){
    if (inputispressed) {
      myinput[myinput.length - 1] = tabs[0].url;
      localStorage.setItem("mylist",JSON.stringify(myinput))
      renderlist(myinput)
    } else {
      myinput.push(tabs[0].url)
      localStorage.setItem("mylist",JSON.stringify(myinput))
      renderlist(myinput)
    }
   })
})

function renderlist(list){
    let listitem = ""
    for (let i = 0; i < list.length; i++) {
        if (i === myinput.length - 1 && inputispressed) {
            listitem += `<li class = "non-clickable">
            <a > ${list[i]}</a>
            </li>`
        } else {
            listitem += `<li>
            <a target='_blank' href ='${list[i]}'>${list[i]}</a>
            </li>`
        }
    }
    ulel.innerHTML = listitem
}

deletebutton.addEventListener("dblclick",function(){
    localStorage.clear()
    myinput = []
    renderlist(myinput)
})

inputbtn.addEventListener("click",function(){
   myinput.push("Note :" +inputel.value)
   inputispressed = true
   inputel.value = ""
   localStorage.setItem("mylist",JSON.stringify(myinput))
   renderlist(myinput)
})
