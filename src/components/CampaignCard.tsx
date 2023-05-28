import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import { ABI } from "@/constants/abi";
import { getJSONFromFileinCID } from "@/utils/storage";
import { BigNumberish, ethers } from "ethers";

interface CampaignCardProps {
  campaign: string;
}

const CampaignCard = ({ campaign }: CampaignCardProps) => {
  const [theData, setTheData] = useState<any>(null);
  const { data, isError, isLoading } = useContractRead({
    address: campaign as `0x${string}`,
    abi: ABI.campaign,
    functionName: "campaignCID",
  });
  const { data: raising } = useContractRead({
    address: campaign as `0x${string}`,
    abi: ABI.campaign,
    functionName: "target",
  });

    const [raisingAmountState, setraisingAmountState] = useState<any>(null);
  useEffect(() => {
    async function getData() {
      if (data) {
        const _data = await getJSONFromFileinCID(data);
        console.log(_data);
        setTheData(_data);
      }
            if (raising) {
              setraisingAmountState(
                Number(ethers.utils.formatEther(raising as BigNumberish))
              );
            }
    }
    getData();
  }, [data]);

  if(!theData) return null

  return (
    <Link
      href={`campaign/${campaign}`}
      className="cursor-pointer flex flex-col items-center justify-start w-full h-full p-4 rounded-2xl shadow-md border-2 border-[#161a28]"
    >
      <div className="w-full h-[250px] rounded-lg overflow-hidden">
        <img
          src={`https://dweb.link/ipfs/${theData?.coverImage}`}
          alt={theData?.title}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col items-start justify-center w-full">
        <h3 className="text-lg font-medium text-white max-w-[300px] py-6">
          {theData?.campaignName}
        </h3>
        <span>Raising</span>
        <div className="flex gap-1 items-center justify-start w-full h-8 text-lime">
          <span className="font-semibold">
            {raisingAmountState}
          </span>
          <span className="font-semibold">BNB</span>
        </div>
      </div>
    </Link>
  );
};