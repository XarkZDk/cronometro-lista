'use strict'

const url = "/api/users"
const modalUsers = new bootstrap.Modal(document.getElementById('modalUsers'))

const btn_add = document.getElementById("btn-add")
const table = document.getElementById("table-users")
const formUsers = document.querySelector('form')
const nickname = document.getElementById("nickname")
const minutes = document.getElementById("minutes")
const seconds = document.getElementById("seconds")
const btn_start = document.getElementById("btn-start")
const btn_stop = document.getElementById("btn-stop")
const btn_submit = document.getElementById("submit")
const players_counter = document.getElementById("players-counter")

let btn_action = "" 

let chronometer;
let m_count = "00"
let s_count = 0


const users = fetch(url)
     .then(r => r.json())
     .then(data => {
        players_counter.textContent = data.length
        render(data)
     })
     .catch(e => console.log(e))

btn_add.addEventListener("click", ()=> {
    nickname.value = ''
    minutes.textContent = "00"
    seconds.textContent = '00'
    s_count = "0"
    m_count = "00"
    modalUsers.show()
})    

btn_submit.addEventListener("click", ()=> {
    btn_action = "submit"
})

btn_start.addEventListener("click", start)
btn_stop.addEventListener("click", stop)

formUsers.addEventListener("submit", (e)=>{
    e.preventDefault()

    if(btn_action == "submit"){
        console.log(nickname.value)
        console.log(minutes.value)
        console.log(seconds.value)
    
        fetch(url, {
            method:"POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                nick:nickname.value,
                time: `${minutes.textContent}:${seconds.textContent}`
            })
        }) 
        .then( res => res.json() )
        .then( data => {
            const newUser = []
            newUser.push(data)
            location.reload()
        })
    }
    
    e.stopPropagation()
})

//=====================================================================


function start (){
    console.log("start")
    chronometer = setInterval(()=> {
        if(s_count === 60) {
            s_count = 0
            m_count ++
            if(m_count < 10) m_count = "0" + m_count
        }
        
        if(s_count < 10) s_count = "0" + s_count
        seconds.textContent = s_count
        minutes.textContent = m_count
        s_count++
        
    }, 1000)
}

function stop () {
    console.log("stop")
    clearInterval(chronometer)
}


async function render (users) {
    let fragment = ''

    users.sort((a,b) => {
        if(a.time < b.time) return -1
        if(a.time > b.time) return 1
        return 0
    })

    for(let i = 0; i < users.length; i++){
        fragment += `
            <tr id="user-${i}"></tr>
                <th>${i+1}</th>
                <td>${users[i].id}</td>
                <td>${users[i].nick}</td>
                <td>${users[i].time}</td>
        `
    }

    table.innerHTML = fragment
}

