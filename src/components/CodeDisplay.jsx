import React from 'react';

const CodeDisplay = ({ queryCode }) => {
    return (
        <div className="code-display">
            <div className="buttons">
                <div className="button first">
                </div>
                <div className="button middle">
                </div>
                <div className="button last">
                </div>
            </div>
            <div className="code-output">
                <p>{queryCode}</p>
            </div>
        </div>
    );
}

export default CodeDisplay;