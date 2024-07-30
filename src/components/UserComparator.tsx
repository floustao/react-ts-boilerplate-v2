import React, { useState } from "react";
import { ComparisonResult, MercuryCustomer, ThirdPartyLink } from "../types";
import { buildHashMap, compareUsers, testResults } from "../utils";

export const UserComparator: React.FC = () => {
  const [mercuryData, setMercuryData] = useState<MercuryCustomer[]>([]);
  const [thirdPartyData, setThirdPartyData] = useState<ThirdPartyLink[]>([]);
  const [comparisonResult, setComparisonResult] =
    useState<ComparisonResult | null>(null);

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setData: React.Dispatch<React.SetStateAction<any[]>>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = JSON.parse(e.target?.result as string);
        setData(data);
      };
      reader.readAsText(file);
    }
  };

  const compareData = (
    mercuryData: MercuryCustomer[],
    thirdPartyData: ThirdPartyLink[]
  ): ComparisonResult => {
    const hashMap = buildHashMap(mercuryData);

    let totalMatches = 0;
    let totalMismatches = 0;
    const results: { linkId: number; result: "Match" | "Mismatch" }[] = [];

    thirdPartyData.forEach((link) => {
      const userMatches = compareUsers(hashMap, link);

      if (userMatches) {
        totalMatches++;
        results.push({ linkId: link.linkId, result: "Match" });
      } else {
        totalMismatches++;
        results.push({ linkId: link.linkId, result: "Mismatch" });
      }
    });

    return { totalMatches, totalMismatches, results };
  };

  const handleCompare = () => {
    if (mercuryData.length > 0 && thirdPartyData.length > 0) {
      const result = compareData(mercuryData, thirdPartyData);
      setComparisonResult(result);
    } else {
      alert("Please upload both JSON files before comparing.");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          textAlign: "left",
        }}
      >
        <div style={{ display: "flex", gap: "8px" }}>
          <label>Upload mercury users:</label>
          <input
            type="file"
            accept=".json"
            onChange={(e) => handleFileUpload(e, setMercuryData)}
          />
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <label>Upload third party links:</label>
          <input
            type="file"
            accept=".json"
            onChange={(e) => handleFileUpload(e, setThirdPartyData)}
          />
        </div>
      </div>

      <div
        style={{ display: "flex", justifyContent: "space-around", gap: "8px" }}
      >
        <button onClick={handleCompare}>Compare users</button>
        <button onClick={testResults}>Test results manually</button>
      </div>
      {comparisonResult && (
        <div>
          <h3>Total Matches: {comparisonResult.totalMatches}</h3>
          <h3>Total Mismatches: {comparisonResult.totalMismatches}</h3>
          {comparisonResult.results.map((res) => (
            <div key={res.linkId}>
              Link {res.linkId}: {res.result}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
