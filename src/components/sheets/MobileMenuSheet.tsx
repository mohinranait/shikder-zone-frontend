"use client";
import React, { useEffect, useState } from "react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import Logo from "../shared/Logo";
import { useAppSelector } from "@/hooks/useRedux";

type TCatType = {
  _id: string;
  name: string;
  catThumbnail: string | null | undefined;
  parent: string | null | undefined;
};

type TTreeNote = TCatType & {
  children?: TTreeNote[];
  createdAt?: string;
};

const buildTree = (items: TCatType[]): TTreeNote[] => {
  const map = new Map();
  items?.forEach((item) => {
    map.set(item?._id, { ...item, children: [] });
  });

  const result: TTreeNote[] = [];

  items?.forEach((item) => {
    if (item.parent) {
      const parent = map.get(item?.parent);
      if (parent) {
        parent.children.push(map.get(item?._id));
      }
    } else {
      result.push(map.get(item?._id));
    }
  });
  return result;
};

const MobileMenuSheet = () => {
  // Redux State
  const { categories } = useAppSelector((state) => state.category);

  const [open, setOpen] = useState(false);
  const [showCategories, setShowCategories] = useState<TTreeNote[]>([]);

  useEffect(() => {
    const format = categories?.map((item) => ({
      _id: item?._id,
      name: item?.name,
      catThumbnail: item?.catThumbnail,
      parent: item?.parent,
    }));

    const categoryTree = buildTree(format as TCatType[]);
    setShowCategories(categoryTree);
  }, [categories]);

  const links = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Offers", href: "/offers" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact-us" },
  ];

  // Recursive component to render nested categories
  const RenderCategory = ({
    category,
    level = 0,
  }: {
    category: TTreeNote;
    level?: number;
  }) => {
    const hasChildren = category.children && category.children.length > 0;

    return (
      <AccordionItem value={category._id} className="border-0 py-1">
        {hasChildren ? (
          <>
            <AccordionTrigger className="py-1 hover:no-underline">
              <Link
                href={`/shop?cat=${category?._id}`}
                onClick={() => setOpen(false)}
                className="text-sm"
              >
                {category.name}
              </Link>
            </AccordionTrigger>
            <AccordionContent className="pb-0">
              <div className={`pl-${level + 3}`}>
                <Accordion className="w-full mb-0" type="single" collapsible>
                  {category?.children &&
                    category?.children.map((child) => (
                      <RenderCategory
                        key={child._id}
                        category={child}
                        level={level + 3}
                      />
                    ))}
                </Accordion>
              </div>
            </AccordionContent>
          </>
        ) : (
          <div className="py-1">
            <Link
              onClick={() => setOpen(false)}
              href={`/shop?cat=${category?._id}`}
              className="text-sm block hover:no-underline"
            >
              {category.name}
            </Link>
          </div>
        )}
      </AccordionItem>
    );
  };

  return (
    <Sheet onOpenChange={setOpen} open={open} key={"left"}>
      <SheetTrigger>
        <li className="py-3 inline-flex items-center justify-center flex-col px-2">
          <Menu size={16} className="text-gray-500 w-5 h-5" />
          <p className="text-xs text-gray-500">Menu</p>
        </li>
      </SheetTrigger>
      <SheetContent className="w-full px-0 py-0 res4:w-[400px]" side={"left"}>
        <div className="flex flex-col h-full">
          <div>
            <div className="h-[50px] px-3 flex gap-1 items-center bg-gray-200">
              <Logo />
            </div>
          </div>
          <div className="flex-grow px-3 py-2 h-[calc(100vh-170px)] overflow-y-auto">
            <Tabs defaultValue="categories" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="categories" className="w-full">
                  Categories
                </TabsTrigger>
                <TabsTrigger value="menu" className="w-full">
                  Menus
                </TabsTrigger>
              </TabsList>
              <TabsContent value="categories">
                <div>
                  <Accordion className="w-full" type="single" collapsible>
                    {showCategories.map((category) => (
                      <RenderCategory key={category._id} category={category} />
                    ))}
                  </Accordion>
                </div>
              </TabsContent>
              <TabsContent value="menu">
                <div className="">
                  {links?.map((link) => (
                    <Link
                      key={link?.name}
                      href={link?.href}
                      onClick={() => setOpen(false)}
                      className="block text-sm py-1"
                    >
                      {link?.name}
                    </Link>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenuSheet;
