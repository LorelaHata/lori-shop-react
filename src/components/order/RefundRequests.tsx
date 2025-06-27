
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "../../data/orders";
import { RefundRequest } from "../../types/order";

interface RefundRequestsProps {
  refunds: RefundRequest[];
}

const RefundRequests = ({ refunds }: RefundRequestsProps) => {
  if (refunds.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Refund Requests</CardTitle>
      </CardHeader>
      <CardContent>
        {refunds.map((refund) => (
          <div key={refund.id} className="mb-4 last:mb-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Refund #{refund.id}</p>
                <p className="text-sm text-muted-foreground">
                  Requested on {formatDate(refund.requestDate)} • €{refund.amount.toFixed(2)}
                </p>
                {refund.responseDate && (
                  <p className="text-sm text-muted-foreground">
                    Processed on {formatDate(refund.responseDate)}
                  </p>
                )}
              </div>
              <Badge className={`${
                refund.status === "approved" ? "bg-green-500" :
                refund.status === "rejected" ? "bg-red-500" :
                "bg-yellow-500"
              } text-white`}>
                {refund.status}
              </Badge>
            </div>
            <p className="text-sm mt-1">Reason: {refund.reason}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RefundRequests;
