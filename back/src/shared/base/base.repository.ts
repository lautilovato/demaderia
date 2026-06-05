import { EntityManager, EntityName, EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';

@Injectable()
/**
 * Repositorio base genérico que encapsula operaciones comunes de persistencia
 * usando MikroORM. Todos los repositorios custom deberían extender este.
 *
 * @template T - Tipo de entidad
 */
export class BaseMikroOrmRepository<
  T extends object,
> extends EntityRepository<T> {
  constructor(
    em: EntityManager,
    entityClass: EntityName<T>,
  ) {
    super(em as any, entityClass);
  }

  /**
   * Guarda una entidad en la base de datos.
   * Reemplaza el antiguo persistAndFlush separando la acción.
   *
   * @param entity - La entidad a guardar
   */
  async save(entity: T): Promise<void> {
    this.em.persist(entity);
    await this.em.flush();
  }

  /**
   * Elimina una entidad y guarda los cambios inmediatamente.
   * Reemplaza el antiguo removeAndFlush separando la acción.
   *
   * @param entity - La entidad a eliminar
   */
  async removeAndFlush(entity: T): Promise<void> {
    this.em.remove(entity);
    await this.em.flush();
  }

  /**
   * Ejecuta todos los cambios pendientes en la unidad de trabajo.
   * Útil si hiciste varios `persist()` o `remove()` antes.
   */
  async flush(): Promise<void> {
    await this.em.flush();
  }

  /**
   * Marca una entidad para ser persistida, pero NO ejecuta el guardado.
   * Necesita luego un `flush()` para hacerse efectivo.
   *
   * @param entity - La entidad a persistir
   */
  async persist(entity: T): Promise<void> {
    this.em.persist(entity);
  }

  /**
   * Marca una entidad para ser eliminada, pero NO ejecuta el borrado.
   * Necesita luego un `flush()` para hacerse efectivo.
   *
   * @param entity - La entidad a eliminar
   */
  async remove(entity: T): Promise<void> {
    this.em.remove(entity);
  }
}