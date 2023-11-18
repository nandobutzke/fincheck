import { ChevronDownIcon } from "@radix-ui/react-icons";
import { TransactionsIcon } from "../../../components/icons/TransactionsIcon";
import { FilterIcon } from "../../../components/icons/FilterIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import { MONTHS } from "../../../../app/config/constants";
import { SliderOption } from "./SliderOption";
import { SliderNavigation } from "./SliderNavigation";
import { formatCurrency } from "../../../../utils/formatCurrency";
import { CategoryIcon } from "../../../components/icons/categories/CategoryIcon";

export function Transactions() {
  return (
    <div className="bg-gray-100 rounded-2xl w-full h-full p-10">
      <header>
        <div className="flex items-centerv justify-between">
          <button className="flex items-center gap-2">
            <TransactionsIcon />
            <span className="text-gray-800 text-sm tracking-[-0.5px] font-medium">Transações</span>
            <ChevronDownIcon className="text-gray-900" />
          </button>

          <button>
            <FilterIcon />
          </button>
        </div>

        <div className="mt-6 relative">
          <Swiper
            slidesPerView={3}
            centeredSlides
          >
            <SliderNavigation />

            {MONTHS.map((month, index) => (
              <SwiperSlide key={month}>
                {({ isActive }) => (
                  <SliderOption
                    isActive={isActive}
                    month={month}
                    index={index}
                  />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </header>

      <div className="mt-4">
        <div className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4">
          <div className="flex-1 flex items-center gap-3">
            <CategoryIcon type="income" />

            <div className="flex flex-col">
              <strong>Almoço</strong>
              <span>18/11/2023</span>
            </div>
          </div>

          <span>
            {formatCurrency(1320)}
          </span>
        </div>
      </div>
    </div>
  );
}
