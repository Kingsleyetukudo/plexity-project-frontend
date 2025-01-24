import likeIcon from "../assets/images/like-icon.svg";
import dislikeIcon from "../assets/images/dislike-icon.svg";
const AppraisalBox = () => {
  return (
    <>
      <div>
        <div className="grid gap-2 shadow-md">
          <div className="grid  md:grid-cols-2 md:px-4">
            <p>
              <span className="font-bold">Reviewed:</span> January 17, 2025
            </p>
            <div className="md:flex justify-between">
              <p>
                <span className="font-bold">Rate:</span> 3.4
              </p>
              <p className=" ">
                <span className="font-bold text-base">
                  Total Question Answered:
                </span>{" "}
                100
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-1.5">
            <div className="flex gap-6 items-center bg-gray-100 p-5">
              <span className="w-48 md:w-24">
                <img src={likeIcon} alt="" />
              </span>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Recusandae, pariatur similique itaque illo accusantium maxime
                adipisci labore perferendis beatae eveniet, quidem nemo? Fugit
                omnis quo quis aut dolor, illo deleniti, repellendus veritatis
                accusamus nesciunt similique neque corporis molestiae doloribus
                libero temporibus. Quidem aspernatur sunt eum illum,
                reprehenderit laborum molestiae eveniet?
              </p>
            </div>
            <div className="flex gap-6 items-center bg-gray-100 p-5">
              <span className="w-48 md:w-24">
                <img src={dislikeIcon} alt="" />
              </span>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Recusandae, pariatur similique itaque illo accusantium maxime
                adipisci labore perferendis beatae eveniet, quidem nemo? Fugit
                omnis quo quis aut dolor, illo deleniti, repellendus veritatis
                accusamus nesciunt similique neque corporis molestiae doloribus
                libero temporibus. Quidem aspernatur sunt eum illum,
                reprehenderit laborum molestiae eveniet?
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppraisalBox;
