
import Card from "../Card/Card"

import "./Cardlist.css"
const Cardlist = (props:{news:any}) => {
  const {news} =props
  return (
    <div className="card_list">
          {news.map((single:any)=> <Card key={single.data.id} header={single?.data?.title} description={single?.data?.text?single.data.text: "lorem lipsum lorem lipsum lorem lipsum lorem lipsum lorem lipsum lorem lipsum lorem lipsum lorem lipsum"} detail={{time:` 
          ${new Date(single.data.time).getMinutes()} Min`,comments:`${single.data.kids && single.data.kids.length > 0 ? single.data.kids.length : 0} comments`}}/>)}
                   
    </div>
  )
}

export default Cardlist
