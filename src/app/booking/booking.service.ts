import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Facility } from './facility.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  facilityAdded = new Subject<Facility[]>();
  facilities: Facility[];
  aDoc: AngularFirestoreDocument<Facility>;

  constructor(private database: AngularFirestore) { }


    fetchFacilitiesData() {
        this.database.collection('facilities')
                    .valueChanges()
                    .subscribe((facilities: Facility[]) => {
                        this.facilityAdded.next(facilities);
                    });
    }

    addDataToDatabase(facility: Facility) {
        this.database.collection('facilities').add(facility);
    }
}

