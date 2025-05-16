import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'LerEarn API',
      version: '1.0.0',
      description: 'API para gerenciamento de livros, autores, categorias e usuários',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desenvolvimento',
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            email: { type: 'string', format: 'email' },
            password: { type: 'string' },
            name: { type: 'string' },
          },
        },
        Author: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            nationality: { type: 'string' },
            birthDate: { type: 'string', format: 'date' },
            biography: { type: 'string' },
          },
        },
        Category: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            description: { type: 'string' },
          },
        },
        Book: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            title: { type: 'string' },
            description: { type: 'string' },
            publication_year: { type: 'integer' },
            url_download: { type: 'string' },
            author: { $ref: '#/components/schemas/Author' },
            category: { $ref: '#/components/schemas/Category' },
          },
        },
        Review: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            rating: { type: 'integer', minimum: 1, maximum: 5 },
            comment: { type: 'string' },
            user: { $ref: '#/components/schemas/User' },
            book: { $ref: '#/components/schemas/Book' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    paths: {
      '/users': {
        get: {
          summary: 'Lista todos os usuários',
          responses: {
            '200': {
              description: 'Lista de usuários',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/User' },
                  },
                },
              },
            },
          },
        },
        post: {
          summary: 'Cria um novo usuário',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/User' },
              },
            },
          },
          responses: {
            '201': {
              description: 'Usuário criado com sucesso',
            },
          },
        },
      },
      '/users/{id}': {
        get: {
          summary: 'Obtém um usuário específico',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string', format: 'uuid' },
            },
          ],
          responses: {
            '200': {
              description: 'Usuário encontrado',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/User' },
                },
              },
            },
          },
        },
        put: {
          summary: 'Atualiza um usuário',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string', format: 'uuid' },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/User' },
              },
            },
          },
          responses: {
            '200': {
              description: 'Usuário atualizado com sucesso',
            },
          },
        },
        delete: {
          summary: 'Remove um usuário',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string', format: 'uuid' },
            },
          ],
          responses: {
            '200': {
              description: 'Usuário removido com sucesso',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: {
                        type: 'string',
                        example: 'Usuário deletado com sucesso'
                      }
                    }
                  }
                }
              }
            },
          },
        },
      },
      '/authors': {
        get: {
          summary: 'Lista todos os autores',
          responses: {
            '200': {
              description: 'Lista de autores',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Author' },
                  },
                },
              },
            },
          },
        },
        post: {
          summary: 'Cria um novo autor',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Author' },
              },
            },
          },
          responses: {
            '201': {
              description: 'Autor criado com sucesso',
            },
          },
        },
      },
      '/authors/{id}': {
        get: {
          summary: 'Obtém um autor específico',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string', format: 'uuid' },
            },
          ],
          responses: {
            '200': {
              description: 'Autor encontrado',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Author' },
                },
              },
            },
          },
        },
        put: {
          summary: 'Atualiza um autor',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string', format: 'uuid' },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Author' },
              },
            },
          },
          responses: {
            '200': {
              description: 'Autor atualizado com sucesso',
            },
          },
        },
        delete: {
          summary: 'Remove um autor',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string', format: 'uuid' },
            },
          ],
          responses: {
            '200': {
              description: 'Autor removido com sucesso',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: {
                        type: 'string',
                        example: 'Autor deletado com sucesso'
                      }
                    }
                  }
                }
              }
            },
          },
        },
      },
      '/categories': {
        get: {
          summary: 'Lista todas as categorias',
          responses: {
            '200': {
              description: 'Lista de categorias',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Category' },
                  },
                },
              },
            },
          },
        },
        post: {
          summary: 'Cria uma nova categoria',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Category' },
              },
            },
          },
          responses: {
            '201': {
              description: 'Categoria criada com sucesso',
            },
          },
        },
      },
      '/categories/{id}': {
        get: {
          summary: 'Obtém uma categoria específica',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string', format: 'uuid' },
            },
          ],
          responses: {
            '200': {
              description: 'Categoria encontrada',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Category' },
                },
              },
            },
          },
        },
        put: {
          summary: 'Atualiza uma categoria',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string', format: 'uuid' },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Category' },
              },
            },
          },
          responses: {
            '200': {
              description: 'Categoria atualizada com sucesso',
            },
          },
        },
        delete: {
          summary: 'Remove uma categoria',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string', format: 'uuid' },
            },
          ],
          responses: {
            '200': {
              description: 'Categoria removida com sucesso',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: {
                        type: 'string',
                        example: 'Categoria deletada com sucesso'
                      }
                    }
                  }
                }
              }
            },
          },
        },
      },
      '/books': {
        get: {
          summary: 'Lista todos os livros',
          responses: {
            '200': {
              description: 'Lista de livros',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Book' },
                  },
                },
              },
            },
          },
        },
        post: {
          summary: 'Cria um novo livro',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Book' },
              },
            },
          },
          responses: {
            '201': {
              description: 'Livro criado com sucesso',
            },
          },
        },
      },
      '/books/{id}': {
        get: {
          summary: 'Obtém um livro específico',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string', format: 'uuid' },
            },
          ],
          responses: {
            '200': {
              description: 'Livro encontrado',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Book' },
                },
              },
            },
          },
        },
        put: {
          summary: 'Atualiza um livro',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string', format: 'uuid' },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Book' },
              },
            },
          },
          responses: {
            '200': {
              description: 'Livro atualizado com sucesso',
            },
          },
        },
        delete: {
          summary: 'Remove um livro',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string', format: 'uuid' },
            },
          ],
          responses: {
            '200': {
              description: 'Livro removido com sucesso',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: {
                        type: 'string',
                        example: 'Livro deletado com sucesso'
                      }
                    }
                  }
                }
              }
            },
          },
        },
      },
      '/reviews': {
        post: {
          summary: 'Cria uma nova avaliação',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    rating: { type: 'integer', minimum: 1, maximum: 5 },
                    comment: { type: 'string' },
                    bookId: { type: 'string', format: 'uuid' },
                  },
                  required: ['rating', 'bookId'],
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'Avaliação criada com sucesso',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Review' },
                },
              },
            },
            '401': {
              description: 'Não autorizado',
            },
          },
        },
      },
      '/reviews/{id}': {
        put: {
          summary: 'Atualiza uma avaliação',
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string', format: 'uuid' },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    rating: { type: 'integer', minimum: 1, maximum: 5 },
                    comment: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Avaliação atualizada com sucesso',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Review' },
                },
              },
            },
            '401': {
              description: 'Não autorizado',
            },
            '404': {
              description: 'Avaliação não encontrada',
            },
          },
        },
        delete: {
          summary: 'Remove uma avaliação',
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string', format: 'uuid' },
            },
          ],
          responses: {
            '200': {
              description: 'Avaliação removida com sucesso',
            },
            '401': {
              description: 'Não autorizado',
            },
            '404': {
              description: 'Avaliação não encontrada',
            },
          },
        },
      },
      '/reviews/book/{bookId}': {
        get: {
          summary: 'Lista todas as avaliações de um livro',
          parameters: [
            {
              name: 'bookId',
              in: 'path',
              required: true,
              schema: { type: 'string', format: 'uuid' },
            },
          ],
          responses: {
            '200': {
              description: 'Lista de avaliações do livro',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Review' },
                  },
                },
              },
            },
            '404': {
              description: 'Livro não encontrado',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options); 