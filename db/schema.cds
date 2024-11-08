using {
    cuid,
    managed
} from '@sap/cds/common';

namespace com.logali;

type Dec : Decimal(16, 2);

context sales {

    entity Orders {
        key Email        : String(65);
            FirstName    : String(30);
            LastName     : String(30);
            Country      : String;
            CreatedOn    : Date;
            OrderStatus  : Integer;
            DeliveryDate : DateTime;
            ImageUrl     : String;
            to_Items     : Composition of many OrderItems
                               on to_Items.to_Orders = $self;
    };

    entity OrderItems : cuid {
        Name             : localized String not null;
        Description      : localized String;
        ReleaseDate      : DateTime default $now;
        DiscontinuedDate : DateTime;
        Price            : Dec;
        Height           : type of Price;
        Width            : Decimal(16, 2);
        Depth            : Decimal(16, 2);
        Quantity         : Decimal(16, 2);
        to_Orders        : Association to Orders;
    }
}
