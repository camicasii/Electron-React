const serial= (serial, totalTicket)=>{            
        let res = serial        
    while(res.length<totalTicket){            
        let num =""    
        for(let i =0; i<9;i++){            
            const numberRandom = parseInt(Math.random()*9)
            num += numberRandom.toString()
        }
        if(!res.includes(num)){
            res.push(num)            
        }
    }
    return res
}
const ticketsSerializer=(totalTicket,asing,selectArray = [],serial_ = [])=>{
    if(asing>selectArray.length)
    return null;
    const tickect =  ticketGenerator(totalTicket,asing,selectArray)
    const cod = serial(serial_, totalTicket)
    let res=[]
    tickect.map((tik,i)=>{
        const data ={
            'TICKET':tik,
            'SERIAL': Number(cod[i]),
            'SELL':false
        }
        return res.push(data)
    })
    return res
}
const  ticketHazar=(asing,selectArray)=>{
    let res =[]                
    while(res.length <asing){        
    const numberRandom = parseInt(Math.random()* selectArray.length)
    const val = selectArray[numberRandom]
    if(!res.includes(val)){
        res.push(val)
    }        
}        
return res.join("-")
}
const ticketGenerator=(totalTicket,asing,selectArray)=>{
    let res = []
    while(res.length <totalTicket){                
        const val = ticketHazar(asing,selectArray)                
        if(!res.includes(val)){
            res.push(val)
        }                
        }    
    return res
    }


   let ticketsSerializer2=(totalTicket,asing,selectArray)=>{
       return new Promise((resolve, reject) => {
        const a =ticketsSerializer(totalTicket,asing,selectArray)
        if(a===null)
        resolve(null)
        resolve(a)

})
   }

const factorial =(n)=>{
    let res = 1 
    for(let i=0;i<n+1;i++){
        if(i===0)            
            continue        
        res *=i        
    }
    return res
}
const combinacion = (n,r)=>{    
    const n_fact = factorial(n)
    const r_fact = factorial(r)
    const rn = n - r
    const rn_fact = factorial(rn)
    const res = n_fact / (r_fact * rn_fact)    
    return res
}
const winner = (arrayData)=>{
    const random_ = Math.random()* arrayData.length
    return random_
}
const  ticketsRandomSerializer=(totalTicket,asing,lengthArray)=>{
    let selectArray =[]
    for(let i =0;i <= lengthArray;i++){
        selectArray.push(i)
    }

    return new Promise((resolve, reject) => {
     const a =ticketsSerializer(totalTicket,asing,selectArray)
     if(a===null)
     resolve(null)
     resolve(a)

})
}



module.exports ={
     ticketsSerializer2,
     combinacion,
    factorial,
    winner,
    ticketsRandomSerializer
}




