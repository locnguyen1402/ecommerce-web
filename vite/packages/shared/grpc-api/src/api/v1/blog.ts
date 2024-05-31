export * from '../../generated/vklink/services/blog/v1/posts/enums_pb';

export {
  CategoryResponse as PostCategoryResponse,
  CategoryInfoResponse as PostCategoryInfoResponse,
} from '../../generated/vklink/services/blog/v1/categories/responses_pb';
export * from '../../generated/vklink/services/blog/v1/posts/responses_pb';
export * from '../../generated/vklink/services/blog/v1/comments/responses_pb';
export * from '../../generated/vklink/services/blog/v1/tags/responses_pb';
// export * from '../../generated/vklink/services/blog/v1/categories/responses_pb';

export {
  CreateCategoryCommand as CreatePostCategoryCommand,
  UpdateCategoryCommand as UpdatePostCategoryCommand,
} from '../../generated/vklink/services/blog/v1/categories/commands_pb';
export * from '../../generated/vklink/services/blog/v1/posts/commands_pb';
export * from '../../generated/vklink/services/blog/v1/comments/commands_pb';
export * from '../../generated/vklink/services/blog/v1/tags/commands_pb';
// export * from '../../generated/vklink/services/blog/v1/categories/commands_pb';

export { FindCategoryByIdQuery as FindPostCategoryByIdQuery } from '../../generated/vklink/services/blog/v1/categories/queries_pb';
export * from '../../generated/vklink/services/blog/v1/posts/queries_pb';
export * from '../../generated/vklink/services/blog/v1/comments/queries_pb';
export * from '../../generated/vklink/services/blog/v1/tags/queries_pb';
// export * from '../../generated/vklink/services/blog/v1/categories/queries_pb';
