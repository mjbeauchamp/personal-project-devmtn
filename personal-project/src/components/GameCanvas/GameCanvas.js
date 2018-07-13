import React from 'react'
import orange from '../../images/orange.png'
import rainbow from '../../images/rainbow.png'
import pink from '../../images/pink.png'
import blue from '../../images/blue.png'

class GameCanvas extends React.Component {
    constructor() {
        super()
        this.state = {
            score: 0,
            level: 1,
            unicornId: null,
            unicornFile: "",
            unicornStyle: {
                width: 60,
                height: 60,
                position: "absolute",
                top: 280,
                left: 270
            },
            // This is the distance of the top of the unicorn from the top of the canvas
            unicornTop: 280,
            //Distance of the bottom of the unidorn from the top of the canvas
            unicornBottom: 340,
            //Unicorn's rignt corner from left side of canvas
            unicornRight:330,
            //Unicorn's left corner from left side of canvas
            unicornLeft:270,
            bubbleId: 0,
            bubbles: [],
            creationTimer: null,
            movementTimer: null,
            leftBtnStyle: {position: "absolute", bottom: 5, left: 260},
            rightBtnStyle: {position: "absolute", bottom: 5, left:300},
            upBtnStyle: {position: "absolute", bottom: 25, left:260},
            downBtnStyle: {position: "absolute", bottom: 25, left:300}
        }
    }

    moveLeft = () => {
        if(this.state.unicornLeft >= 1){
            this.setState({
                unicornStyle: Object.assign({}, this.state.unicornStyle, {
                    left: this.state.unicornStyle.left - 20
                }),
                unicornRight: this.state.unicornRight - 20,
                unicornLeft: this.state.unicornLeft - 20
            })
        }
    }

    moveRight = () => {
        if(this.state.unicornRight <= 600){
            this.setState({
                unicornStyle: Object.assign({}, this.state.unicornStyle, {
                    left: this.state.unicornStyle.left + 20
                }),
                unicornRight: this.state.unicornRight + 20,
                unicornLeft: this.state.unicornLeft + 20
            })
        }
    }

    moveUp = () => {
        if(this.state.unicornTop >= 20){
            this.setState({
                unicornStyle: Object.assign({}, this.state.unicornStyle, {
                    top: this.state.unicornStyle.top - 20
                }),
                unicornTop: this.state.unicornTop - 20,
                unicornBottom: this.state.unicornBottom - 20
            })
        }
    }

    moveDown = () => {
        if(this.state.unicornTop <= 260){
            this.setState({
                unicornStyle: Object.assign({}, this.state.unicornStyle, {
                    top: this.state.unicornStyle.top + 20
                }),
                unicornTop: this.state.unicornTop + 20,
                unicornBottom: this.state.unicornBottom + 20
            })
        }
    }

    componentDidMount() {
        document.body.onkeydown = this.onArrowDown
        this.setState({
            unicornFile: this.props.unicornFile,
            unicornId: this.props.unicornId,
            creationTimer: this.creationTimer = setInterval(this.makeBubbles, 3400),
            movementTimer: this.movementTimer = setInterval(this.moveBubbles,   400)
       })
     }

     componentWillUnmount() {
         document.body.onkeydown = null
         clearInterval(this.state.creationTimer);
         clearInterval(this.state.movementTimer);
     }


    makeBubbles = () => {
        const column = Math.floor( Math.random() * 500)
        this.setState({
            bubbleId: this.state.bubbleId + 1
        })

        const newBubble = {
            index: this.state.bubbles.length,
            popped: false,
            id: this.state.bubbleId,
            //Bottom edge of bubble
            bubbleBottom: -10,
            //Left edge of bubble
            bubbleLeft: column,
            bubbleRight: column + 50,
            styling: {
                position: 'absolute',
                top: -60,
                left: column,
                width: 50,
                height: 50,
                backgroundColor: "aqua",
                borderRadius: 50
            }
        }

        let newBubbles = this.state.bubbles;
        newBubbles.push(newBubble)
        //Update this.state with new bubbles
        this.setState({
            bubbles: newBubbles
        })
    }
    //Reset unicorn position, used when user levels up
    levelUp = (myScore) => {
        this.setState({
            score: myScore,
            level: this.state.level + 1,
            bubbles: [],
            unicornStyle: {
                width: 60,
                height: 60,
                position: "absolute",
                top: 280,
                left: 270
            },
            unicornTop: 280,
            //Distance of the bottom of the unidorn from the top of the canvas
            unicornBottom: 340,
            //Unicorn's rignt corner from left side of canvas
            unicornRight:330,
            //Unicorn's left corner from left side of canvas
            unicornLeft:270
        })
    }

    moveBubbles = () => {
        let alteredBubbles = this.state.bubbles.map( bubble => {
            let newBubble = Object.assign({}, bubble);
            let updates = {
                top: newBubble.styling.top + 10
            }
            let newObj = Object.assign({}, newBubble.styling, updates);

            newBubble.styling = newObj;
            newBubble.bubbleBottom = newBubble.bubbleBottom + 10;

            return newBubble
        })
        let {unicornTop, unicornLeft, unicornRight, unicornBottom} = this.state;
        let newArr = alteredBubbles.map( (bubble, index, arr) => {
            //Is bubble at unicorn collision height and within the unicorn's width parameters?
            if(unicornTop===bubble.bubbleBottom || (unicornTop < bubble.bubbleBottom &&bubble.bubbleBottom < (unicornBottom + 40))){
                //Is the bubble within the unicorn's width? If so, bubble is set to popped, and it will get filtered out of the array
                if((bubble.bubbleRight > unicornLeft && !(bubble.bubbleLeft > unicornRight))){
                     console.log("Pop!")
                     bubble.popped = true;
                     //Conditional logic to level up
                     let myScore = this.state.score+5;
                    //  if(myScore === 50){
                    //      alert("You beat Level 1!")
                    //     this.setState({
                    //         score: myScore,
                    //         level: this.state.level + 1
                    //     })
                    //  } else {
                    //     this.setState({
                    //         score: myScore
                    //     })
                    //  }
                    switch(myScore){
                        case 15:
                            alert("You beat Level 1!")
                            this.levelUp(myScore)
                            break;
                        case 25:
                            alert("You beat Level 2!")
                            this.levelUp(myScore)
                            break;
                        case 40:
                            alert("You beat Level 3!")
                            this.levelUp(myScore)
                            break;
                        case 50:
                            alert("You beat Level 4!")
                            this.levelUp(myScore)
                            break;
                        case 60:
                            alert("You beat Level 5!")
                            this.levelUp(myScore)
                            break;
                        case 70:
                            alert("You beat Level 6!")
                            this.levelUp(myScore)
                            break;
                        case 80:
                            alert("You beat Level 7!")
                            this.levelUp(myScore)
                            break;
                        case 90:
                            alert("You beat Level 8!")
                            this.levelUp(myScore)
                            break;
                        case 100:
                            alert("Congratulations! You won the game!")
                            break;
                        default:
                            this.setState({
                                score: myScore
                            })
                    }
                }
            }
            //Is bubble off the screen?
            if(bubble.bubbleBottom > 380){
                bubble.popped = true;
            }
            // console.log(`unicornLeft: ${unicornLeft} unicornRight: ${unicornRight} bubbleLeft: ${bubble.bubbleLeft} bubbleRight: ${bubble.bubbleRight}`)
            return bubble;
        }).filter(bubble => {
            return bubble.popped === false;
        });


        this.setState({
            bubbles: newArr
        })
    }

    onArrowDown = (e) => {
        //ArrowUp, ArrowDown, ArrowRight, ArrowLeft
        switch(e.key){
            case "ArrowUp":
                this.moveUp();
                break;
            case "ArrowDown":
                this.moveDown();
                break;
            case "ArrowRight":
                this.moveRight();
                break;
            case "ArrowLeft":
                this.moveLeft();
                break;
        }
    }

    render(){
        let showBubbles = this.state.bubbles.map((bubble, index) => {
            return (
                <div key={index} style={bubble.styling} className='bubble'>

                </div>
            )
        })

        let canvasStyle = {
            position: "relative",
            width: 600,
            height: 400,
            backgroundColor: "blue",
            overflow: 'hidden'
        }

        let chosenImgVar;
        switch(this.props.unicornFile){
            case ("orange"):
                chosenImgVar = orange;
                break;
            case ("blue"):
                chosenImgVar = blue;
                break;
            case ("pink"):
                chosenImgVar = pink;
                break;
            case ("rainbow"):
                chosenImgVar = rainbow;
                break;
            default:
                chosenImgVar = rainbow;
        }
        return(
            <div 
                className='container' 
                style={canvasStyle} 
                // onKeyDown={e => this.onArrowDown(e)}
                //This makes it so you can use the buttons 
                autoFocus={true}
            >
                <h2>Level: {this.state.level} Score: {this.state.score}</h2>
                { showBubbles }
                <img id="unicornImage" src={chosenImgVar} alt="" style={this.state.unicornStyle}/>
                <button 
                    onClick={this.moveUp} 
                    style={this.state.upBtnStyle}
                >Up</button>
                <button onClick={this.moveDown} style={this.state.downBtnStyle}>Down</button>
                <button onClick={this.moveLeft} style={this.state.leftBtnStyle}>Left</button>
                <button onClick={this.moveRight} style={this.state.rightBtnStyle}>Right</button>
            </div>
        )
    }
}

export default GameCanvas;