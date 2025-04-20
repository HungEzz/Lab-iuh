import { CiBookmark } from "react-icons/ci";

export function Recipe({item}){
    return (
    <div style={{display:'flex',justifyContent:'space-between',flexDirection:'column',borderRadius:20}}>
        <img src={item.img} height={'176px'} width={'273px'} style={{borderRadius:'20px 20px 0 0',objectFit:"contain"}}/>
        <div style={{display:'flex',flexDirection:'column',padding:10,border:'1px solid #cfcdc8', borderRadius:'0 0 20px 20px'}}>
            <div style={{display:'flex',alignItems:'start'}}>
                <p style={{color:'black',width:'200px',textAlign:'start',fontWeight:'bold',fontSize:20}}>{item.name}</p>
                <button style={{borderRadius:100,padding:'7px 10px',margin:'0',backgroundColor:'white',border:'1px solid #F44B87FF',color:'#F44B87FF'}}><CiBookmark size={25}/></button>
            </div>
            <p style={{marginTop:10,lineHeight:'40px',color:'#F44B87FF',backgroundColor:'#FBC8DAFF',width:'40%',borderRadius:30}}>{item.time} minutes</p>
        </div>
    </div>
    )
} 