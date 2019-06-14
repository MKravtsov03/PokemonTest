import React from "react";
import styled from "styled-components";

const FightLogList = styled.div`
  max-width: 650px;
  margin: 640px auto 0;
`;
const FightLogInfo = styled.div`
  width: 40%;
  border-radius: 10px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(169, 248, 145);
`;
const FightLogDamage = styled.div`
  width: 40%;
  border-radius: 10px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(252, 51, 51);
  color: #fff;
`;

type Props = {
  fighter1: Object,
  fighter1: Object,
  attacks: Array
}

const FightLog = (props: Props) => {
  const { attacks, fighter1, fighter2 } = props;

  return (
    <FightLogList>
      {
        attacks.map((attack, index) => (
          <div key={index} className={index % 2 ? "fight-log__line reverse" : "fight-log__line"} >
            <FightLogInfo>
              {index % 2 ? `${fighter2.name} used ${attack.name}` : `${fighter1.name} used ${attack.name}`}
            </FightLogInfo>
            <svg width="66" height="16" viewBox="0 0 33 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M33 3.99999L27 7.46409V0.535889L33 3.99999Z" fill="#5E6C8A" />
              <path d="M0 2.99999H27V4.99999H0V2.99999Z" fill="#5E6C8A" />
            </svg>
            <FightLogDamage>
              {attack.multiplyDmg === 0 ? "BLOCKED" : `-${attack.multiplyDmg}`}
            </FightLogDamage>
          </div>
        ))
      }
    </FightLogList>
  );
};


export default FightLog;
