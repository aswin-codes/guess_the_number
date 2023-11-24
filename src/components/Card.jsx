import React, { useEffect, useState, useRef } from "react";
import clown from "../assets/clown.png";

const codes = [
  {
    id : 1,
    code : `
    //Moving data
    ORG 000H 
    MOV A, #55H ; load 55 into A
    MOV R0, #0D3 ; load d3 into r0
    MOV A, R0 ; load R0 into A 
    MOV R1, A ; load A to r1
    END
    `
  },
  {
    id : 2,
    code : `
    //Moving data between specified address
    ORG 000H 
MOV 55H, #0AAH ; move AAH to address location 55h 
MOV A, 55H ; move address location 55h to A 
MOV 33H, A ; move value in A to address location 33h 
MOV R0, 22H ; move address location 22H to R0 
MOV 44H, R0 ; move R0 to address location 44H 
END 
`
  }, 
  {
    id : 3,
    code : `
    //Addition
    ORG 000H 
MOV A, #97H ; move data 97H to A 
ADD A, #76H ; ADD value in A with data 76H 
MOV 55H, A ; move A value to address location 55H 
END 
`
  }, 
  {
    id : 4,
    code  : `
    //Subtraction
    ORG 000H 
MOV A, #62H ; move data 62H to A 
SUBB A, #96H ; subtract with borrow value in A with data 96H 
MOV R6, A ; move A value to register location R6 
MOV A, #27H ; move data 27H to A 
SUBB A, #12H ; subtract with borrow value in A with data 12H 
MOV R7, A ; move A value to register location R7 
END 
`
  },
  {
    id : 5,
    code : `
    //Multiplication
    ORG 000H 
MOV A, #33H ; move data 62H to A 
MOV B,#34H ; move data 34H to B 
MUL AB ; multiply value in register A with value in register B 
MOV 35H, B ; move value in register B to address location 35H 
MOV 36H, A ; move value in register A to address location 36H 
END 

    `
  },
  {
    id : 6,
    code : `ORG 0000H
	MOV DPTR,#8000H
	MOVX A, @DPTR
	MOV R0,A
	INC DPTR
	MOVX A,@DPTR
	CLR C
	SUBB A,R0
	JZ EQUAL
	JNC SMALL
	SETB 7FH
	SJMP END1

SMALL: SETB 78H
	SJMP END1

EQUAL: CLR 78H
	CLR 7FH
	SJMP END1

END1: NOP
	END
`
  },
  {
    id :7,
    code : `
    //Half Adder
    ORG 0000H
	CLR P2.0
	CLR P2.1
	SETB P0.0
	SETB P0.1
	MOV C, P0.0
	ANL C, P0.1
	MOV P2.0, C
	MOV C, P0.0
	JC INPUT1
	MOV A,#00H
BACK1: MOV C,P0.1
	JC INPUT2
	MOV R0,#00H
BACK2: XRL A,R0
	MOV C,ACC.0
	MOV P2.1,C
	SJMP END1
INPUT1: MOV A, #01H
	SJMP BACK1
INPUT2: MOV R0,#01H
	SJMP BACK2
END1: NOP
	END
`
  },
  {
    id :8,
    code : `
    //Timer
    ORG 0000H
    MOV TMOD,#01H
    BACK: MOV TLO,#O1H
    MOV TH0,#0FFH
    SETB TR0
    AGAIN: JNB TF0,AGAIN
    CLR TR0
    CPL P2.7
    CLR TF0
    SJMP BACK
    END
    `
  },
  {
    id : 7,
    code : `
    //Toggle
    ORG 0000H
	MOV TMOD,#10H
	REPEAT:MOV R0,#21
	CPL P1.7
	BACK: MOV TL1, #00H
	MOV TH1,#00H
	SETB TR1
	AGAIN: JNB TF1,AGAIN
	CLR TR1
	CLR TF1
	DJNZ R0,BACK
	SJMP REPEAT
`
  },
  {
    id : 8,
    code : `
    //Serial Inpt
    MOV TMOD,#20H 
MOV TH1,#0FDH 
SETB TR1 
AGAIN: MOV SCON,#40H
MOV A,#'V' 
ACALL SEND 
MOV A,#'I' 
ACALL SEND
MOV A,#'T' '
ACALL SEND 
SJMP AGAIN
SEND: MOV SBUF,A 
HERE: JNB TI,HERE 
CLR TI 
RET
END
`
  },
  {
    id : 9,
    code :`
    //Serail input
    MOV TMOD,#20H ;timer1,mode 2(auto reload)
    MOV TH1,#0FAH ;4800 baud rate
    MOV SCON,#50H ;8-bit, 1 stop, REN enabled
    SETB TR1 ;start timer 1
    HERE: JNB RI,HERE ;wait for char to come in
    MOV A,SBUF ;saving incoming byte in A
    MOV P1,A ;send to port 1
    CLR RI ;getready to receive next ;byte
    SJMP HERE ;keep getting data
    `
  },
  {
    id:10,
    code : `
    //LCD without DPTR
    ORG 0000H
    MOV A,#38H
    ACALL COMNWRT
    
    ACALL DELAY
    MOV A,#0EH
    ACALL COMNWRT
    ACALL DELAY
    MOV A,#01
    ACALL COMNWRT
    ACALL DELAY
    MOV A, #06H
    ACALL COMNWRT
    ACALL DELAY
    MOV A,#84H
    ACALL COMNWRT
    ACALL DELAY
    MOV A, #’V’
    ACALL DATAWRT
    ACALL DELAY
    MOV A, #’I’
    ACALL DATAWRT
    ACALL DELAY
    MOV A, #’T’
    ACALL DATAWRT
    
    AGAIN: SJMP AGAIN
    COMNWRT: MOV P2,A
    CLR P3.7
    
    CLR P3.6
    SETB P3.5
    ACALL DELAY
    CLR P3.5
    RET
    
    DATAWRT: MOV P2,A
    SETB P3.7
    CLR P3.6
    SETB P3.5
    ACALL DELAY
    CLR P3.5
    RET
    
    DELAY:
    MOV R3,#50
    
    HERE2:
    MOV R4,#255
    
    HERE:
    DJNZ R4, HERE
    DJNZ R3, HERE2
    RET
    END
    `
  },
  {
    id :11,
    code : `
    //LCD with DPTR
    ORG 0000H
    MOV DPTR, #MYCOM
    C1: CLR A
    MOVC A,@A+DPTR
    ACALL COMNWRT
    ACALL DELAY
    INC DPTR
    JZ SEND_DAT
    SJMP C1
    SEND_DAT:
    MOV DPTR, #MYDATA
    D1: CLR A
    MOVC A,@A+DPTR
    ACALL DATAWRT
    ACALL DELAY
    INC DPTR
    JZ AGAIN
    SJMP D1
    AGAIN: SJMP AGAIN
    COMNWRT: ; send command to LCD
    MOV P2, A ; copy reg A to P2
    CLR P3.7 ; RS=0 for command
    CLR P3.6 ; R/W=0 for write
    SETB P3.5 ; E=1 for high pulse
    ACALL DELAY ; give LCD some time
    
    CLR P3.5 ; E=0 for H-to-L pulse
    RET
    DATAWRT: ; write data to LCD
    MOV P2, A ; copy reg A to port 1
    SETB P3.7 ; RS=1 for data
    CLR P3.6 ; R/W=0 for write
    SETB P3.5 ; E=1 for high pulse
    ACALL DELAY ; give LCD some time
    CLR P3.5 ; E=0 for H-to-L pulse
    RET
    DELAY: MOV R3, #250 ; 50 or higher for fast CPUs
    HERE2: MOV R4, #255 ; R4 = 255
    HERE: DJNZ R4, HERE ; stay until R4 becomes 0
    DJNZ R3, HERE2
    RET
    ORG 300H
    MYCOM: DB 38H, 0EH, 01, 06, 84H, 0 ; commands and null
    MYDATA: DB ‘VIT UNIVERSITY’,0
    END
    `
  },
  {
    id : 12,
    code : `
    //LED
    ORG 0000H
	MOV P1,#00H
	SETB P1.0
	SETB P1.1
	CLR P1.0
	CLR P1.1
	END
`
  }
]

const Card = () => {
  //State Variables
  const inputRef = useRef(null);
  const [guess, setGuess] = useState("");
  const [number, setNumber] = useState(0);
  const [numberOfChances, setNumberOfChances] = useState(5);
  const [hint, setHint] = useState("");
  const [completed, setCompleted] = useState(false);
  useEffect(() => {
    initialTask();
    inputRef.current.focus()
  }, []);

  //Required functions

  const initialTask = () => {
    generateRandomNumber();
    setNumberOfChances(5);
    setCompleted(false);
    setHint("");
  };

  const generateRandomNumber = () => {
    const n = parseInt(Math.random() * 100);
    setNumber(n);
    //console.log(n);
  };

  const check = async () => {
    const e = codes.find((e) => e.id == guess)
    await navigator.clipboard.writeText(e ? e.code : '')
    const n = numberOfChances;
    setGuess("");
    if (n == 1 && guess != number) {
      //losing
      setCompleted(true);
      const text = `You lost. The correct number is ${number}.`;
      setHint(text);
    } else {
      const text = generateHintText(number, guess, n);
      setHint(text);
      if (n == 1 || guess == number) {
        setCompleted(true);
      }
      setNumberOfChances((no) => {
        return (no -= 1);
      });
    }
  };

  const generateHintText = (generated, guessed, currentChances) => {
    if (guessed == generated) {
      const x = 5 - currentChances + 1;
      return `That's correct. It took you ${x} ${x==1 ? 'turn' : 'turns'}, to correctly guess the number.`;
    } else if (guessed > generated) {
      return  `That's high.`
    } else {
      return "That's low."
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter'){
      check();
    }
  }

  return (
    <div className="bg-light p-5 mb-20 rounded-xl shadow-custom flex flex-col items-center">
      <h1 className="text-dark font-nunito font-bold text-2xl mb-4">
        Guess the Number
      </h1>
      <div className="flex-col flex md:flex-row justify-between w-full">
        <div className="m-2 md:my-5  md:mx-5 flex justify-center items-center">
          <img src={clown} alt="Clown" className="h-20 md:h-full" />
        </div>

        {completed ? (
          <div className="flex flex-col justify-between my-10">
            <div className="w-35 w-60">{hint}</div>
            <div className="flex items-center">
              <p>Wanna try again ?</p>
              <button
                onClick={() => initialTask()}
                className="ml-2 bg-blue-400 p-2 rounded-md text-sm"
              >
                Try again
              </button>
            </div>
          </div>
        ) : (
          <div className="my-10 flex flex-col justify-around">
            <div className="max-w-xs flex flex-col items-center mb-4">
              <p>
                Enter a number between 1 and 100. You have only{" "}
                {numberOfChances} chances...
              </p>
            </div>
            <div className="flex items-center">
              <input
                ref={inputRef}
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                type="number"
                placeholder="Enter"
                onKeyDown={handleKeyDown}
                className="border border-dark rounded text-md px-2 py-2"
              />
              <button
                onClick={() => check()}
                className="border border-dark p-2 ml-4 rounded hover:bg-dark hover:text-white transition ease-in-out duration-200"
              >
                Enter
              </button>
            </div>
            <div className="text-sm my-2">{hint}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
