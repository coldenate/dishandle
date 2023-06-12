import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const Maininvitation = () => {
	const tokenRef = useRef<HTMLSpanElement>(null);
	const [searchParams] = useSearchParams();

	const [encryptedUserToken, setEncryptedUserToken] = useState<string | null>(
		null
	);
	const [fetchFinished, setFetchFinished] = useState<boolean>(false);

	const code = searchParams.get("code");

	useEffect(() => {
		if (code) {
			fetch(
				`https://remcord-exchange-server.onrender.com/callback?code=${code}`
			)
				.then((response) => {
					return response.text();
				})
				.then((data) => {
					console.log(data);
					// take out all quotes

					const parsedData = data.replace(/['"]+/g, "");
					setEncryptedUserToken(parsedData);
					setFetchFinished(true);
				})
				.catch((error) => console.error(error));
		}
	}, [code]);

	const handleCopy = () => {
		if (tokenRef.current) {
			const range = document.createRange();
			range.selectNode(tokenRef.current);
			window.getSelection()?.removeAllRanges();
			window.getSelection()?.addRange(range);
			document.execCommand("copy");
			window.getSelection()?.removeAllRanges();
		}
	};

	return (
		<div
			id="card"
			className="from-ctp-mantle to-ctp-crust outline-ctp-green"
		>
			<h1 className="from-ctp-green to-ctp-blue text-center">
				RemCord-Discord Authenticator
			</h1>
			{fetchFinished ? (
				<>
					<p>
						<span className="text-ctp-text">
							Please copy the following token and paste it into
							the RemCord Plugin Window in RemNote.
						</span>
					</p>
					<p>
						<span className="text-ctp-red">
							⚠️ Do not share this with anyone! ⚠️
						</span>
					</p>
					<div className="bg-ctp-surface0 font-mono rounded-sm left-0 text-center">
						<div className="max-w-[500px]">
							<span
								ref={tokenRef}
								className="from-ctp-green to-ctp-blue highlight-grad break-words"
							>
								{encryptedUserToken}
							</span>
						</div>
					</div>

					<div className="">
						<button
							className="bg-ctp-teal hover:bg-ctp-blue active:bg-ctp-blue/75 m-2 text-ctp-text"
							onClick={handleCopy}
						>
							Copy to Clipboard
						</button>
					</div>

					<div id="palette"></div>
				</>
			) : (
				<div>
					<button
						className="bg-ctp-teal text-ctp-text"
						style={{ pointerEvents: "none" }}
					>
						Loading...
					</button>
				</div>
			)}
		</div>
	);
};
