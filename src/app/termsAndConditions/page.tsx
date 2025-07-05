import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingCart,
  CheckCircle,
  CreditCard,
  UserX,
  Tag,
  Shield,
  Users,
  Phone,
  Building,
  DollarSign,
  FileText,
  AlertTriangle,
  Gavel,
} from "lucide-react";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            FIT Nearby - Terms & Conditions
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Please read these terms carefully before using our platform. By
            using FIT Nearby, you agree to be bound by these terms and
            conditions.
          </p>
          <Badge variant="outline" className="mt-4">
            Effective Date: February 1, 2025
          </Badge>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="members" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="members" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              For Members
            </TabsTrigger>
            <TabsTrigger value="owners" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              For Gym Owners
            </TabsTrigger>
          </TabsList>

          {/* Members Terms */}
          <TabsContent value="members">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    Terms and Conditions for Members (Customers)
                  </CardTitle>
                  <CardDescription>
                    By purchasing a gym membership through FIT Nearby, you agree
                    to the following terms and conditions.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Section 1: Membership Purchase */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5 text-green-600" />
                    1. Membership Purchase & Validity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">
                      1.1. Non-Transferable
                    </h4>
                    <p className="text-slate-600">
                      All memberships purchased via FIT Nearby are
                      non-transferable and can only be used by the registered
                      customer.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">1.2. Validity Period</h4>
                    <p className="text-slate-600">
                      Memberships are valid as per the duration and terms
                      mentioned at the time of purchase (e.g., 1 month, 3
                      months, etc.).
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">1.3. Start Date</h4>
                    <p className="text-slate-600">
                      The membership activates from the date of your first gym
                      visit OR as mentioned in the confirmation message/email.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Section 2: Access & Verification */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    2. Access & Verification
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">
                      2.1. Proof of Purchase
                    </h4>
                    <p className="text-slate-600">
                      Customers must show their FIT Nearby receipt, QR code, or
                      confirmation email to access the gym.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">2.2. ID Verification</h4>
                    <p className="text-slate-600">
                      Gyms have the right to verify your government ID or mobile
                      number to confirm your identity.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">2.3. Entry Denial</h4>
                    <p className="text-slate-600 mb-2">
                      Entry may be denied if you:
                    </p>
                    <ul className="list-disc list-inside text-slate-600 space-y-1 ml-4">
                      <li>Present fake or mismatched documents</li>
                      <li>
                        Violate the gym&apos;s internal policies or code of
                        conduct
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Section 3: Payments & Refunds */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-purple-600" />
                    3. Payments & Refunds
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">
                      3.1. No Cash Payments at Gym
                    </h4>
                    <p className="text-slate-600">
                      All payments must be made directly through FIT Nearby.
                      Gyms are not authorized to collect money for FIT Nearby
                      memberships.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">3.2. Refund Policy</h4>
                    <p className="text-slate-600 mb-2">
                      Refunds will only be considered in the following cases:
                    </p>
                    <ul className="list-disc list-inside text-slate-600 space-y-1 ml-4">
                      <li>The gym denies access without valid reason</li>
                      <li>The gym is permanently closed or unavailable</li>
                      <li>
                        Major misrepresentation of services (verified by FIT
                        Nearby)
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">3.3. Refund Timeline</h4>
                    <p className="text-slate-600">
                      If approved, the refund will be processed within 7–15
                      working days of the request.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">
                      3.4. No Refunds for Non-Usage
                    </h4>
                    <p className="text-slate-600">
                      No refunds or extensions will be given if you choose not
                      to attend the gym after purchasing a membership.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Section 4: Code of Conduct */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserX className="h-5 w-5 text-red-600" />
                    4. Member Code of Conduct
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">
                      4.1. Respect Gym Rules
                    </h4>
                    <p className="text-slate-600">
                      Customers must follow the gym&apos;s guidelines, including
                      dress code, equipment use, hygiene, and safety protocols.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">
                      4.2. Misconduct Consequences
                    </h4>
                    <p className="text-slate-600">
                      Any inappropriate behavior, property damage, or rule
                      violation may result in membership cancellation without
                      refund.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">
                      4.3. Harassment/Abuse
                    </h4>
                    <p className="text-slate-600">
                      FIT Nearby maintains a zero-tolerance policy toward any
                      form of abuse or harassment. Legal action may be taken
                      against offenders.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Section 5: Pricing & Offers */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Tag className="h-5 w-5 text-orange-600" />
                    5. Pricing, Discounts & Offers
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">5.1. Dynamic Pricing</h4>
                    <p className="text-slate-600">
                      Prices on FIT Nearby may vary due to discounts, offers, or
                      location-based pricing.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">5.2. Offer Validity</h4>
                    <p className="text-slate-600">
                      Discounts and promotional prices are time-bound and cannot
                      be claimed retroactively.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Section 6: Health Disclaimer */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-yellow-600" />
                    6. Health Disclaimer
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">6.1. Medical Fitness</h4>
                    <p className="text-slate-600">
                      You confirm that you are medically fit to participate in
                      physical activities. Please consult a doctor if you have
                      health conditions.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">
                      6.2. Assumption of Risk
                    </h4>
                    <p className="text-slate-600">
                      FIT Nearby and the gym are not liable for any injuries,
                      accidents, or health complications arising during
                      workouts.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Section 7: Platform Rights */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gavel className="h-5 w-5 text-indigo-600" />
                    7. Platform Rights & Responsibilities
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">
                      7.1. Service Provider Role
                    </h4>
                    <p className="text-slate-600">
                      FIT Nearby is a listing and facilitation platform, not the
                      direct operator of the gym.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">
                      7.2. Limited Liability
                    </h4>
                    <p className="text-slate-600">
                      We are not responsible for internal gym management,
                      trainer behavior, equipment safety, or maintenance.
                      However, we will take action if serious complaints are
                      made.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">
                      7.3. Modification of Terms
                    </h4>
                    <p className="text-slate-600">
                      FIT Nearby reserves the right to modify these terms at any
                      time. Updated terms will be available on the website and
                      apply to all new purchases.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Gym Owners Terms */}
          <TabsContent value="owners">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-blue-600" />
                    Terms and Conditions for Gym Owners
                  </CardTitle>
                  <CardDescription>
                    By listing your gym on FIT Nearby, you agree to these
                    legally binding terms and conditions.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Section 1: Commission */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    1. Commission and Pricing Policy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">1.1. Commission Rate</h4>
                    <p className="text-slate-600">
                      FIT Nearby charges a flat 20% commission on each
                      membership sold through the platform.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">1.2. Fixed Agreement</h4>
                    <p className="text-slate-600">
                      This commission is non-negotiable and final once your gym
                      is listed on the platform.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">
                      1.3. Discount Authority
                    </h4>
                    <p className="text-slate-600">
                      FIT Nearby reserves the right to offer discounts to
                      customers for marketing purposes. However, the final
                      payout to the gym will always be based on the last fixed
                      price after deducting the 20% commission.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Section 2: Payment */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-purple-600" />
                    2. Payment and Settlement
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">
                      2.1. Settlement Period
                    </h4>
                    <p className="text-slate-600">
                      All payments will be made between 15 to 30 working days
                      after the membership is sold and verified.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">
                      2.2. No Direct Collection
                    </h4>
                    <p className="text-slate-600">
                      You cannot request full payment from the customer directly
                      if the membership was purchased via FIT Nearby.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">
                      2.3. Holding or Withholding Payments
                    </h4>
                    <p className="text-slate-600">
                      If any gym attempts to delay or deny service to a paid
                      customer or withhold FIT Nearby&apos;s commission, the
                      payment will be put on hold and legal action may be taken.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Section 3: Policy Changes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    3. Policy Change & Notice Terms
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">
                      3.1. Notice for Change in Services or Commission
                    </h4>
                    <p className="text-slate-600">
                      If you wish to change your pricing, stop taking members,
                      or request commission modifications, you must send a
                      written notice to FIT Nearby at least 15 working days in
                      advance.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">
                      3.2. Sudden Denial Not Allowed
                    </h4>
                    <p className="text-slate-600">
                      You cannot deny entry to new FIT Nearby customers without
                      prior written communication. Doing so will result in
                      temporary suspension or delisting.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Section 4: Listing Responsibility */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    4. Listing Responsibility & Authenticity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">
                      4.1. Authorized Listing
                    </h4>
                    <p className="text-slate-600">
                      You confirm that you are the legal owner or authorized
                      representative of the gym.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">
                      4.2. Correct Information
                    </h4>
                    <p className="text-slate-600">
                      All gym details (address, contact, services, timings,
                      etc.) submitted to FIT Nearby must be true, accurate, and
                      updated regularly.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">
                      4.3. License and Approvals
                    </h4>
                    <p className="text-slate-600">
                      You are responsible for having valid licenses, approvals,
                      and safety protocols at your facility.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Section 5: Legal Protection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-red-600" />
                    5. Legal Protection & Fraud Prevention
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">
                      5.1. No Fraudulent Claims
                    </h4>
                    <p className="text-slate-600">
                      You cannot later claim that you didn&apos;t read or agree
                      to these terms. Listing your gym and accepting customers =
                      full agreement to these terms.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">
                      5.2. Attempt to Reduce Commission Without Consent
                    </h4>
                    <p className="text-slate-600 mb-2">
                      Any gym trying to reduce the commission or ask for full
                      customer payment after the sale, without notice, will
                      face:
                    </p>
                    <ul className="list-disc list-inside text-slate-600 space-y-1 ml-4">
                      <li>Withholding of payout</li>
                      <li>Permanent delisting</li>
                      <li>Legal action</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">
                      5.3. Bypassing FIT Nearby
                    </h4>
                    <p className="text-slate-600">
                      If you try to shift customers from FIT Nearby to direct
                      payments without approval, your listing will be
                      immediately terminated and your balance withheld.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Section 6: Service Commitment */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-orange-600" />
                    6. Service Commitment to Customers
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">
                      6.1. Accepting Paid Members
                    </h4>
                    <p className="text-slate-600">
                      You must provide service to every customer who presents a
                      valid FIT Nearby membership.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">
                      6.2. Refusal to Serve
                    </h4>
                    <p className="text-slate-600">
                      Refusing entry to any verified member can result in refund
                      liability and suspension of your profile.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">
                      6.3. No Additional Charges
                    </h4>
                    <p className="text-slate-600">
                      You cannot charge any hidden or additional fee to FIT
                      Nearby members beyond what is listed on the platform.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Section 7: Termination */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    7. Termination & Delisting
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">
                      7.1. FIT Nearby reserves the right to:
                    </h4>
                    <ul className="list-disc list-inside text-slate-600 space-y-1 ml-4">
                      <li>
                        Suspend your listing at any time if you violate any term
                      </li>
                      <li>Delay or cancel payouts if fraud is suspected</li>
                      <li>
                        Take legal action in case of monetary or service fraud
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Section 8: Final Agreement */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gavel className="h-5 w-5 text-indigo-600" />
                    8. Final Agreement Clause
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">
                      By listing your gym on FIT Nearby, you:
                    </h4>
                    <ul className="list-disc list-inside text-slate-600 space-y-1 ml-4">
                      <li>Accept all terms mentioned above</li>
                      <li>
                        Agree that you cannot deny or dispute these terms later
                      </li>
                      <li>
                        Allow FIT Nearby to manage pricing, commission, and
                        customer service experience as per this agreement
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Contact Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-blue-600" />
              Customer Support & Communication
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 mb-4">
              For support, refunds, complaints, or any questions regarding these
              terms and conditions, please contact us:
            </p>
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="font-semibold text-slate-900">
                FIT Nearby Support Team
              </p>
              <p className="text-slate-600">Email: Fitnearby.as@gmail.com</p>
              <p className="text-slate-600">Phone: +91 9717796714</p>
              <p className="text-slate-600">
                Business Hours: Monday - Friday, 8:00 AM - 8:00 PM
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-500">
            Last updated: January 1, 2025 | © 2025 FIT Nearby. All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
