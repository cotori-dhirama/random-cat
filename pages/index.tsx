import { NextPage } from "next";
import { useEffect, useState } from "react";
import styles from "./index.module.css";

const IndexPage: NextPage = () => {
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchImage().then(newImage => {
            setImageUrl(newImage.url);
            setLoading(false);
        });
    }, []);

    // ボタン押下で画像読み込み
    const handleClick = async () => {
        setLoading(true);   // 読み込み中とする
        const newImage = await fetchImage();
        setImageUrl(newImage.url); // 画像URLを更新
        setLoading(false);  // 読み込み済みとする
    };

    return (
        <div className={styles.page}>
            <button onClick={handleClick} className={styles.button}>ほかのにゃんこも見る</button>
            <div className={styles.frame}>
                {loading || <img src={imageUrl} className={styles.img}/>}
            </div>
        </div>
    );
}

export default IndexPage;

type Image = {
    url: string;
};

const fetchImage = async (): Promise<Image> => {
    const res = await fetch("https://api.thecatapi.com/v1/images/search");
    const images = await res.json();
    console.log(images);
    return images[0];
}

fetchImage().then(image => {
    console.log(image.url);
});