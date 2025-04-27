import Icons from "../../Ui/Icons";
import MenuBar from "../../Ui/MenuBar";
import SideBar from "../../Ui/SideBar";
import Spinner from "../../Ui/Spinner";
import NavBar from "./../../Ui/NavBar";
import { useAboutUs } from "./useAboutUs";
import { useTeamMembers } from "./useTeamMembers";

function AboutUsHeader() {
  const { isLoadingAboutUs, aboutUsData } = useAboutUs();
  const { isLoadingTeamMembers, teamMembersData } = useTeamMembers();

  if (isLoadingAboutUs) return <Spinner />;
  if (isLoadingTeamMembers) return <Spinner />;

  return (
    <>
      <Icons />
      <header>
        <NavBar
          containerClass="xl:flex"
          hiddenClass="xl:hidden"
          positionClass="top-20"
          widthClass="lg:w-44"
        />
        <MenuBar
          containerClass="xl:flex"
          hiddenClass="hidden"
          widthClass="lg:w-64"
        />
        <div className="flex flex-wrap xl:flex-nowrap mt-6 xl:mt-0 mx-2.5 lg:mx-33.75">
          <SideBar containerClass="xl:flex" widthClass="w-64" />
          {aboutUsData?.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center"
            >
              <div className="xl:w-[550px] xl:h-[275px]">
                <img src={item.image} className="w-full h-full" />
              </div>
              <span className="font-VazirBold text-2xl mt-5">درباره ما</span>
              <span className="font-Vazir xl:w-[550px] mt-4 text-justify">
                {item.content}
              </span>
            </div>
          ))}
          <div className="flex xl:flex-col gap-5 mt-4 xl:mt-0 xl:mr-10">
            {teamMembersData.map((teamMember) => (
              <div key={teamMember.id} className="border w-[33%] xl:w-40">
                <div>
                  <img src={teamMember.image} className="w-full" alt="" />
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-VazirBold sm:text-2xl lg:text-xl">
                    {teamMember.name}
                  </span>
                  <span className="font-VazirMedium">
                    {teamMember.position}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>
    </>
  );
}

export default AboutUsHeader;
