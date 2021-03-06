import {AccessDataService} from './AccessesData.service';

describe('AccessDataService', () => {
  let service;

  beforeEach(() => {
    service = new AccessDataService();
  });

  it('should run #getPlaceAccesses()', async () => {

    service.getPlaceAccesses();
    expect(service.getPlaceAccesses).toHaveBeenCalled();

  });

  it('should run #getOrganizationAccesses()', async () => {
    service.getOrganizationAccesses();
    expect(service.getOrganizationAccesses).toHaveBeenCalled();
  });

});
