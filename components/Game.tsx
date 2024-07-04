import { useParams } from "next/navigation";
import { useState } from "react";

export default function Game() {
  const [userName, setUserName] = useState("");
  const params = useParams<{ gameId: string }>();
  const [inputEnabled, setInputEnabled] = useState(true);

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col">
          <p className="fs-2">Game {params.gameId}</p>
        </div>
        <div className="col">
          <p className="fs-2">
            {inputEnabled && (
              <input
                type="text"
                placeholder="User Name"
                className="form-control ms-3"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onBlur={() => setInputEnabled(false)}
              ></input>
            )}
            {!inputEnabled && (
              <>
                {userName}
                <button
                  className="btn btn-secondary ms-3"
                  onClick={() => setInputEnabled(true)}
                >
                  Change Name
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
