import { FC } from "react";
import { IconType } from "react-icons";

interface ListingCategoryProps {
  label: string;
  description: string;
  icon: IconType;
}

const ListingCategory: FC<ListingCategoryProps> = ({
  label,
  description,
  icon: Icon,
}) => {
  // const category = useMemo(() => {
  //   return categories.find((category) => category.label === listing.category);
  // }, [listing.category]);

  return (
    <div className="col-span-4 flex flex-row gap-2 items-center">
      <Icon size={40} className="text-neutral-600" />
      <div>
        <div className="text-lg font-semibold">{label}</div>
        <div className="font-light text-neutral-500">{description}</div>
      </div>
    </div>
  );
};

export default ListingCategory;
