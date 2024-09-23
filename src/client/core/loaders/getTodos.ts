import { Todo } from "../../../core/entities/Todo";
import { todoApiService } from "../http/TodoApiService";

export const getTodosLoader = async (
  page: number = 1,
  pageSize: number = 10
) => {
  const response = await todoApiService.getTodos({ page, pageSize });
  if (response.success) {
    const { list, hasNextPage, hasPreviousPage } = response.data;
    return list;
  }

  console.error(response);
  throw new Error(response.error.message);
};
