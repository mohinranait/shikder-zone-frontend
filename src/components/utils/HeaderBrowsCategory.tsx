"use client";

import { DEFAULT_IMAGE } from "@/helpers/secretVariable";
import { useAppSelector } from "@/hooks/useRedux";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type TBuildTree = {
  _id: string;
  name: string;
  parent: string;
  catThumbnail: string;
};

export type TTreeNode = TBuildTree & {
  children?: TBuildTree[];
  createdAt?: string;
};

function buildTree(items: TBuildTree[]): TTreeNode[] {
  const map = new Map();
  items?.forEach((item) => {
    map.set(item?._id, { ...item, children: [] });
  });

  const result: TTreeNode[] = [];

  items?.forEach((item) => {
    if (item.parent) {
      const parent = map.get(item.parent);
      if (parent) {
        parent?.children.push(map.get(item._id));
      }
    } else {
      result.push(map.get(item._id));
    }
  });

  return result;
}

const HeaderBrowsCategory = () => {
  // Redux State
  const { categories } = useAppSelector((state) => state.category);

  const [showCategories, setShowCategories] = useState<TTreeNode[]>([]);

  useEffect(() => {
    const formate = categories?.map((d) => ({
      _id: d?._id,
      name: d.name,
      catThumbnail: d.catThumbnail,
      parent: d.parent,
    }));

    const categoryFormateForTree = buildTree(formate as TBuildTree[]);

    setShowCategories(categoryFormateForTree);
  }, [categories]);

  return (
    <ul className="relative z-[999] divide-y bg-white  ">
      {showCategories?.map((category: TTreeNode, index) => (
        <li key={index} className="group/category">
          <Link
            href={`/shop?cat=${category?._id}`}
            className="inline-flex text-primary font-medium transition-colors hover:text-main w-full px-4 py-2 justify-between items-center"
          >
            <span className="inline-flex gap-2 items-center">
              <Image
                src={category?.catThumbnail || `/${DEFAULT_IMAGE}`}
                width={20}
                height={20}
                alt="Image"
                className="w-5 h-5 rounded"
              />

              <span className="text-gray-800">{category?.name}</span>
            </span>

            {category?.children && category?.children?.length > 0 && (
              <ChevronRight size={16} className="text-gray-600" />
            )}
          </Link>
          {category?.children && category?.children?.length > 0 && (
            <ul className="w-[250px] divide-y h-full border border-border border-l-0 border-t-0 group-hover/category:block hidden absolute top-0 z-10 bg-white left-[279px]">
              {category?.children?.map((subCat: TTreeNode, index) => (
                <li key={index} className="group/subcategory">
                  <Link
                    href={`/shop?cat=${subCat?._id}`}
                    className="inline-flex text-primary hover:text-main w-full px-4 py-2 justify-between items-center font-medium transition-colors"
                  >
                    <span className="inline-flex gap-1 items-center">
                      <span className="">{subCat?.name}</span>
                    </span>
                    {subCat?.children && subCat?.children?.length > 0 && (
                      <ChevronRight size={16} className="text-gray-600" />
                    )}
                  </Link>

                  {subCat?.children && subCat?.children?.length > 0 && (
                    <ul className="w-[250px] divide-y z-[999] h-full border border-border border-l-0 border-t-0 group-hover/subcategory:block hidden absolute top-0  bg-white left-[250px]">
                      {subCat?.children?.map((subSubCat: TTreeNode, index) => (
                        <li key={index}>
                          <Link
                            href={`/shop?cat=${subSubCat?._id}`}
                            className="inline-flex  text-primary hover:text-main w-full px-4 py-2 justify-between items-center font-medium transition-colors"
                          >
                            <span className="inline-flex gap-1 items-center">
                              <span className="">{subSubCat?.name}</span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

export default HeaderBrowsCategory;
