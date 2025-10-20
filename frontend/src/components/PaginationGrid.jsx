import React, { useState } from "react";
import { CardBody, CardContainer, CardItem, Tooltip } from "./ThreeDCard";

const CARDS_PER_PAGE = 6;

const PaginationGrid = ({ allies }) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(allies.length / CARDS_PER_PAGE);

  const pagedAllies = allies.slice((page - 1) * CARDS_PER_PAGE, page * CARDS_PER_PAGE);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-6">
        {pagedAllies.length > 0 ? (
          pagedAllies.map((ally, idx) => (
            <CardContainer key={ally.name + idx} className="inter-var">
              <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-52 h-auto rounded-xl p-4 border">
                <CardItem
                  translateZ="50"
                  className="text-base font-bold text-neutral-600 dark:text-white mb-1"
                >
                  {ally.name}
                </CardItem>
                <CardItem
                  as="p"
                  translateZ="60"
                  className="text-neutral-500 text-xs max-w-xs dark:text-neutral-300 mb-3"
                >
                  {ally.quote}
                </CardItem>
                <CardItem translateZ="100" className="w-full mb-3">
                  <div className="aspect-square w-full overflow-hidden rounded-xl group-hover/card:shadow-xl bg-gray-200 dark:bg-neutral-800">
                    <img
                      src={ally.image}
                      className="w-full h-full object-cover"
                      alt={ally.name}
                    />
                  </div>
                </CardItem>
                <div className="flex justify-between items-center">
                  <div className="relative z-[200]">
                    <Tooltip stats={{ ...ally.positive, ...ally.negative }}>
                      <button
                        className="px-3 py-1.5 rounded-lg text-xs font-normal dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        Stats
                      </button>
                    </Tooltip>
                  </div>
                  <CardItem
                    translateZ={20}
                    as="button"
                    className="px-3 py-1.5 rounded-lg bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                    onClick={() => console.log(`Signed up for ${ally.name}`)}
                  >
                    Sign up
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          ))
        ) : (
          <div className="text-center py-12 w-full">
            <p className="text-xl text-gray-500 dark:text-gray-400">No allies found</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">Try adjusting your search or filter</p>
          </div>
        )}
      </div>
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mb-8">
          <button
            className="px-3 py-1 rounded-lg border bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              className={`px-2 py-1 rounded-lg border text-xs font-semibold mx-0.5 ${
                page === idx + 1
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
              }`}
              onClick={() => setPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
          <button
            className="px-3 py-1 rounded-lg border bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 disabled:opacity-50"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default PaginationGrid;
