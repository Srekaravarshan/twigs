import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon
} from '@sparrowengg/twigs-react-icons';
import {
  ComponentProps,
  SyntheticEvent,
  forwardRef,
  useEffect,
  useId,
  useState
} from 'react';
import { Box } from '../box';
import { Button, IconButton } from '../button';
import { usePagination } from '../hooks';
import { styled } from '../stitches.config';

const StyledList = styled('ul', {
  display: 'flex',
  alignItems: 'center',
  gap: '$2'
});

type ButtonSizeType = Pick<ComponentProps<typeof Button>, 'size'>;

export type PaginationProps = {
  total: number;
  itemsPerPage: number;
  activePage: number;
  siblingCount?: number;
  // eslint-disable-next-line no-unused-vars
  onChange?: (event: SyntheticEvent, page: number) => void;
  size?: ButtonSizeType['size'];
};

const DOTS = 'DOTS';

/**
 * @param total total items inside pagination
 * @param itemsPerPage number of items in each age
 * @param activePage currently focused page
 * @param onChange returns click event and active page number
 */
export const Pagination = forwardRef<HTMLDivElement, PaginationProps>(({
  total,
  itemsPerPage,
  activePage,
  siblingCount,
  onChange,
  size = 'sm',
  ...rest
}, ref) => {
  const keyId = useId();
  const [page, setPage] = useState<number>(activePage);

  const paginationRange = usePagination({
    totalItems: total,
    itemsPerPage,
    activePage: page,
    siblingCount
  });

  const changeActivePage = (event: SyntheticEvent, newPage: number) => {
    setPage(newPage);
    if (onChange) {
      onChange(event, newPage);
    }
  };

  useEffect(() => {
    setPage(activePage);
  }, [activePage]);

  const isPrevDisabled = page === 1 || total === 0;
  const isNextDisabled = page === paginationRange?.[paginationRange?.length - 1] || total === 0;

  return (
    <Box as="nav" aria-label="pagination" {...rest} ref={ref}>
      <StyledList>
        <li>
          <IconButton
            icon={<ChevronLeftIcon />}
            aria-disabled={isPrevDisabled}
            aria-label="Previous"
            color="bright"
            size={size}
            disabled={isPrevDisabled}
            onClick={(event: SyntheticEvent) => changeActivePage(event, page - 1)}
            type="button"
          />
        </li>
        {paginationRange?.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <li key={`pagination-dots-${keyId}-${index}`}>
                <IconButton
                  as="span"
                  icon={<EllipsisHorizontalIcon />}
                  color="bright"
                  size={size}
                  css={{
                    cursor: 'default',
                    pointerEvents: 'none'
                  }}
                />
              </li>
            );
          }
          return (
            <li key={`pagination-${keyId}-page-${pageNumber}`}>
              <Button
                onClick={(event: SyntheticEvent) => changeActivePage(event, Number(pageNumber))}
                aria-label={`Page ${pageNumber}`}
                color={page === pageNumber ? 'default' : 'bright'}
                aria-current={page === pageNumber}
                type="button"
                size={size}
              >
                {pageNumber}
              </Button>
            </li>
          );
        })}
        <li>
          <IconButton
            icon={<ChevronRightIcon />}
            aria-label="Next"
            color="bright"
            size={size}
            disabled={isNextDisabled}
            aria-disabled={isNextDisabled}
            onClick={(event: SyntheticEvent) => changeActivePage(event, page + 1)}
            type="button"
          />
        </li>
      </StyledList>
    </Box>
  );
});
