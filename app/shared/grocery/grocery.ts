/**
 * This is one possible item for our grocery list.
 */
export class Grocery {
  /**
   * Build a grocery with mapping from name to id in telrik database.
   * @param id from some telrik api
   * @param name display name for this grocery item
   */
  constructor(public id: string, public name: string) {}
}