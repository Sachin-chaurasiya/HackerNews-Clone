import React ,{useState} from "react"
import Card from "../Card/Card"
import "./Cardlist.css"
const Cardlist = (props:{news:any}) => {
  const [visible,setVisible]=useState(5);
  const loadHandler=()=>{
    setVisible(prevState=>prevState+5)
  }
  const {news} =props
  return (
    <div className="card_list">
          {news.slice(0,visible).map((single:any)=> 
            <Card key={single.data.id} header={single?.data?.title} description={single?.data?.text?single.data.text: "lorem lipsum lorem lipsum lorem lipsum lorem lipsum lorem lipsum lorem lipsum lorem lipsum lorem lipsum"} detail={{time:` 
            ${new Date(single.data.time).getMinutes()} Min`,comments:`${single.data.kids && single.data.kids.length > 0 ? single.data.kids.length : 0} comments`}} url={single.data.url}/>
                 
          )
          }
          {news.length>0 && <button className="button" onClick={loadHandler} style={{display:`${visible===500?"none":"block"}`}}>Load more</button>}
          
    </div>
  )
}

export default Cardlist
