import { useState } from "react";
import { ISpecification } from "../../../../interface/model";

import '../css/css.css'

type Props = {
    specifications: ISpecification[],
    description: string,
    short_description: string
}

export const Specifications = ({ specifications, description, short_description }: Props) => {
    const [showMore, setShowMore] = useState<boolean>(false);

    const handleShowMore = () => {
        setShowMore(!showMore);
    }

    return (
        <div className="flex gap-x-3 border-t">
            <div className="border w-[70%] p-3 rounded-[10px] mt-10 shadow-xl">
                <div className="font-semibold text-[18px] mb-3 text-[#363636] text-center bg-[#f2f2f2] rounded-[10px] p-3">
                    <h2 className="text-[#d70018] text-[20px] font-semibold">Đặc điểm nổi bật</h2>
                    <div className="text-[17px] font-normal leading-[28px] text-justify">
                        <li>Hiệu năng ấn tượng trong tầm giá - Chip MediaTek Helio G96 mạnh mẽ cùng 8GB RAM</li>
                        <li>Tận hưởng không gian giải trí sống động - Màn hình AMOLED 6.67", FHD+ sắc nét, chân thực</li>
                        <li>Ghi lại trọn vẹn mọi khoảng khắc - Cụm 4 camera sau lên đến 108MP, đa dạng chế độ chụp</li>
                        <li>Năng lượng tràn đầy cho cả ngày dài - Viên pin khủng 5000mAh, sạc nhanh 67W</li>
                    </div>
                </div>

                <div className="border-l-[5px] my-10">
                    <p className="pl-3 leading-6">{short_description}
                    </p>
                </div>

                <div className="grid place-items-center">
                    {showMore ? (
                        <>
                            <div className="text-justify" dangerouslySetInnerHTML={{ __html: description }}></div>
                            <div className="flex justify-center border max-w-[100px] p-2 rounded-[10px]  hover:border-red-500 hover:text-red-500">
                                <button onClick={handleShowMore}>Thu gọn</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="text-justify" dangerouslySetInnerHTML={{ __html: description?.slice(0, 800) }}></div>
                            <button className="flex justify-center border max-w-[100px] p-2.5 rounded-[10px] hover:border-red-500 hover:text-red-500" onClick={handleShowMore}>
                                <span>Xem thêm</span>
                            </button>
                        </>
                    )}
                </div>
            </div>

            <div className="border w-[30%] p-3 rounded-[10px] shadow-xl text-center mt-10 max-h-[450px]">
                <span className="font-semibold text-[18px] mb-3 text-[#363636">Thông số kỹ thuật</span>
                <div id="scrolling" className="overflow-auto max-h-[400px] flex mt-3 border p-3 rounded-[10px] text-[14px]">
                    <div>
                        {specifications?.[0]?.attributes?.map(function (item: { name: string, value: string }, index: number) {
                            return (
                                <div key={index} className="flex min-w-[310px] text-justify leading-5 border-b mb-3">
                                    <p className="flex w-[50%]">
                                        {item.name}
                                    </p>
                                    <p className="flex w-[50%] leading-5 ml-3">
                                        {item.value}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div >
    )
}