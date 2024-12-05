import { FilterIcon } from "../../../components/icons/FilterIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import { MONTHS } from "../../../../app/config/constants";
import { SliderOption } from "./SliderOption";
import { SliderNavigation } from "./SliderNavigation";
import { formatCurrency } from "../../../../utils/formatCurrency";
import { CategoryIcon } from "../../../components/icons/categories/CategoryIcon";
import { useTransactionsController } from "./useTransactionsController";
import cn from "../../../../utils/cn";
import { Spinner } from "../../../components/Spinner";
import emptyStateImage from '../../../../assets/empty-state.svg';
import { TransactionTypeDropdown } from "./TransactionTypeDropdown";
import { FiltersModal } from "./FiltersModal";
import { TransactionType } from "../../../../enums/TransactionType";
import { formatDate } from "../../../../utils/formatDate";
import { EditTransactionModal } from "../../modals/EditTransactionModal";

export function Transactions() {
  const {
    areValuesVisible,
    transactions,
    isInitialLoading,
    isLoading,
    handleChangeFilters,
    handleApplyFilters,
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    filters,
    isEditModalOpen,
    handleCloseEditModal,
    handleOpenEditModal,
    transactionBeingEdited,
  } = useTransactionsController();

  const hasTransactions = transactions.length > 0;

  return (
    <div className="bg-gray-100 rounded-2xl w-full h-full p-10 flex flex-col">
      {isInitialLoading && (
        <div className="h-full flex items-center justify-center">
          <Spinner className="w-10 h-10" />
        </div>
      )}

      {!isInitialLoading && (
        <>
          <FiltersModal
            open={isFiltersModalOpen}
            onClose={handleCloseFiltersModal}
            onApplyFilters={handleApplyFilters}
          />
          <header>
            <div className="flex items-center justify-between">
              <TransactionTypeDropdown
                onSelect={handleChangeFilters('type')}
                selectedType={filters.type}
              />
              <button onClick={handleOpenFiltersModal}>
                <FilterIcon />
              </button>
            </div>

            <div className="mt-6 relative">
              <Swiper
                slidesPerView={3}
                centeredSlides
                initialSlide={filters.month}
                onSlideChange={swiper => {
                  if (swiper.realIndex === filters.month) return;
                  handleChangeFilters('month')(swiper.realIndex)
                }}
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

          <div className="mt-4 space-y-2 flex-1 overflow-y-auto">
            {isLoading && (
              <div className="flex flex-col h-full items-center justify-center">
                 <Spinner className="w-10 h-10" />
              </div>
            )}

            {!hasTransactions && !isLoading && (
              <div className="flex flex-col h-full items-center justify-center">
                <img src={emptyStateImage} alt="Empty state" />
                <p className="text-gray-700 mt-4">
                  Não encontramos nenhuma transação!
                </p>
              </div>
            )}

            {hasTransactions && !isLoading && (
              <>
                {transactionBeingEdited && (
                  <EditTransactionModal
                    transaction={transactionBeingEdited}
                    open={isEditModalOpen}
                    onClose={handleCloseEditModal}
                  />
                )}

                {transactions.map(transaction => (
                  <div
                    onClick={() => handleOpenEditModal(transaction)}
                    key={transaction.id}
                    className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex-1 flex items-center gap-3">
                      <CategoryIcon
                        type={transaction.type}
                      />

                      <div>
                        <strong className="font-bold tracking-[-0.5px] block">
                          {transaction.name}
                        </strong>
                        <span className="text-sm text-gray-600">
                          {formatDate(new Date(transaction.date))}
                        </span>
                      </div>
                    </div>

                    <span className={cn(
                        'tracking-[-0.5px] font-medium',
                        !areValuesVisible && 'blur-sm',
                        transaction.type === TransactionType.EXPENSE ? 'text-red-800' : 'text-green-800'
                      )}
                    >
                      {transaction.type === TransactionType.EXPENSE ? '-' : '+'} {formatCurrency(transaction.value)}
                    </span>
                  </div>
                ))}
              </>
            )}

          </div>
        </>
      )}

    </div>
  );
}
