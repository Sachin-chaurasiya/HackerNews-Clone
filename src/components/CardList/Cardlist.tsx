
import Card from "../Card/Card"

import "./Cardlist.css"
const Cardlist = () => {
  return (
    <div className="card_list">
            <Card header="lorem lipsum lorem lipsum lorem lipsum" description="lorem lipsum lorem lipsum lorem lipsum lorem lipsum lorem lipsum lorem lipsum lorem lipsum lorem lipsum lorem lipsum " detail={{time:" 4 min",comments:"50 comments"}}/>
            <Card header="lorem lipsum lorem lipsum lorem lipsum" description="lorem lipsum lorem lipsum lorem lipsum lorem lipsum lorem lipsum lorem lipsum lorem lipsum lorem lipsum lorem lipsum " detail={{time:` 1 min`,comments:"35 comments"}}/>
            <Card header="lorem lipsum lorem lipsum lorem lipsum" description="lorem lipsum lorem lipsum lorem lipsum lorem lipsum lorem lipsum lorem lipsum lorem lipsum lorem lipsum lorem lipsum " detail={{time:" 3 min",comments:"5 comments"}}/>
    </div>
  )
}

export default Cardlist
