import React from 'react';
import "./index.css"

const TargetCard = ({value}) => {

    return (
        <div className={"serverCard"}>

                    <div className={"serverCard_container"}>
                        <h4 style={{textDecoration: "underline"}}>Ціль №{value?.id}</h4>
                        <span>Перша точка: {value?.firstPoint}</span>
                        <span>Остання точка: {value?.secondPoint}</span>
                    </div>

        </div>
    );
};

export default TargetCard;