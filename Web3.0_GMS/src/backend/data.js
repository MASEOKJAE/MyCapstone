import { create } from "ipfs-http-client";
import { Buffer } from 'buffer';
import img from "./Eat.png";

export async function tokenOffering(courseName, section, type, tokenName, totalScore) {
  const projectId = 'api key';
  const projectSecret = 'api key secrete';
  const ipfs = create({
        host: 'ipfs.infura.io',
        port: 5001,
        protocol: 'https',
        headers: {
                authorization: `Basic ${Buffer.from(`${projectId}:${projectSecret}`).toString('base64')}`,
        },
  });

  try {
    const imageBuffer = await fetch(img).then((response) => {
      if (!response.ok) {
        throw new Error('HTTP error! status: ${response.status}');
      }
      return response.arrayBuffer();
    });

    const metadata = {
      name: "My NFT",
      description: "...",
      image: {
        path: "Eat.png",
        content: imageBuffer,
      },
      attributes: [
        {
          trait_type: "course name",
          value: courseName,
        },
        {
          trait_type: "section",
          value: section,
        },
        {
          trait_type: "type",
          value: type,
        },
        {
          trait_type: "tokenName",
          value: tokenName,
        },
        {
          trait_type: "totalScore",
          value: totalScore,
        },
      ],
    };

    const { cid } = await ipfs.add(JSON.stringify(metadata));
    console.log(`File uploaded with CID ${cid}`);
    console.log(`https://ipfs.io/ipfs/${cid}`);
  } catch (error) {
    console.error(error);
  }
}